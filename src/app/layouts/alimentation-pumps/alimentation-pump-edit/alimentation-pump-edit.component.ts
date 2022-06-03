import { ProductService } from "./../../../shared/services/api/product.service";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { PumpService } from "./../../../shared/services/api/pump.service";
import { Pump } from "./../../..//shared/models/pump";
import { AlimentationPump } from "./../../../shared/models/alimentation-pump";
import { FuelPump } from "./../../../shared/models/fuel-pump";
import { AuthenticationService } from "./../../../shared/services";
import { AlimentationPumpService } from "./../../../shared/services/api/alimentation-pump.service";
import { FuelPumpService } from "./../../../shared/services/api/fuel-pump.service";
import { ReceptionLineService } from "./../../../shared/services/api/reception-line.service";
import { ReceptionService } from "./../../../shared/services/api/reception.service";
import { Reception, ReceptionLine } from "./../../../shared/models";

@Component({
  selector: "app-alimentation-pump-edit",
  templateUrl: "./alimentation-pump-edit.component.html",
  styleUrls: ["./alimentation-pump-edit.component.scss"],
})
export class AlimentationPumpEditComponent implements OnInit {
  @Input() selectedAlimentationPump = new AlimentationPump();
  @Input() editMode: number;
  editModeB: boolean = false;
  @Output() showDialog = new EventEmitter<boolean>();
  fuelPumpList: Array<FuelPump> = [];
  fuelPumpSearch: string;
  alimentationPumpForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = "Modifier un alimentation Pompe";
  selectFuelPump: FuelPump = new FuelPump();
  subscriptions = new Subscription();
  receptionList: Array<Reception> = [];
  receptionLineList: Array<ReceptionLine> = [];

  constructor(
    private alimentationPumpService: AlimentationPumpService,
    private receptionService: ReceptionService,
    private receptionLineService: ReceptionLineService,
    private pumpService: PumpService,
    private fuelPumpService: FuelPumpService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private authentificationService: AuthenticationService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    /* this.subscriptions.add(this.uomService.findAll().subscribe((data: Uom[]) => {
      this.uoms = data;
    }));*/

    if (this.editMode === 1) {
      this.selectedAlimentationPump = new AlimentationPump();
      this.title = "Ajouter un alimentation pompe";
      this.editModeB = true;
    } else {
      this.selectFuelPump = this.selectedAlimentationPump.fuelPump;
      console.log(this.selectedAlimentationPump);

      // this.subscriptions.add(this.receptionLineService.find('reception.code~'+ this.selectedAlimentationPump.reception.code).subscribe(
      //   data => {
      //     this.receptionLineList = data.filter(f=>f.product.code === this.selectFuelPump.product.code);
      //   }
      // ));
    }
    this.displayDialog = true;
    this.initForm();
  }

  initForm() {
    const d = new Date(this.selectedAlimentationPump.dateAlimentation);

    this.alimentationPumpForm = new FormGroup({
      fuelPump: new FormControl(
        this.selectedAlimentationPump.fuelPump,
        Validators.required
      ),
      quantity: new FormControl(
        this.selectedAlimentationPump.quantity,
        Validators.required
      ),
      alimentationDate: new FormControl(d, Validators.required),
      // 'reception': new FormControl(this.selectedAlimentationPump.reception, Validators.required),

      //'line': new FormControl(this.selectedAlimentationPump.receptionLine, Validators.required),
    });
  }

  onSubmit() {
    console.log(this.alimentationPumpForm);

    this.isFormSubmitted = true;
    if (this.alimentationPumpForm.invalid) {
      return;
    }
    this.spinner.show();

    this.selectedAlimentationPump.dateAlimentation =
      this.alimentationPumpForm.value["alimentationDate"];
    this.selectedAlimentationPump.quantity =
      this.alimentationPumpForm.value["quantity"];
    this.selectedAlimentationPump.fuelPump =
      this.alimentationPumpForm.value["fuelPump"];
    this.selectedAlimentationPump.owner =
      this.authentificationService.getDefaultOwner();
    console.log(this.selectedAlimentationPump);
    let res: number = 0;
    let pump: Pump;

    res = ((this.selectedAlimentationPump.quantity as number) +
      this.selectFuelPump.quantity) as number;

    this.pumpService.findById(this.selectFuelPump.pump.id).subscribe((data) => {
      pump = data;
      //this.insertAlimentationPump();
      console.log(this.selectFuelPump.product.stockQuantity);

      this.productService
        .findById(this.selectFuelPump.product.id)
        .subscribe((data) => {
          if (data.stockQuantity >= this.selectedAlimentationPump.quantity) {
            console.log(data.stockQuantity +" - " +this.selectedAlimentationPump.quantity );

            pump.capacity < res
              ? this.toastr.error("Erreur Quantité ", "Erreur")
              : this.insertAlimentationPump();
          }
          else {
            this.toastr.error("Erreur Quantité ", "Erreur")
          }
        });

      // if(pump.capacity>res){
      //   this.insertAlimentationPump();
      // }
      // else if(pump.capacity < res){
      //   console.log(pump.capacity +"+++" +res);
      //   pump.capacity < res

      // }
      // else if(pump.capacity=res){
      //   this.insertAlimentationPump();
      // }
      this.spinner.hide();
    });
  }

  insertAlimentationPump() {
    this.subscriptions.add(
      this.alimentationPumpService.set(this.selectedAlimentationPump).subscribe(
        (data) => {
          this.toastr.success("Elément est Enregistré avec succès", "Edition");
          // this.loadData();
          this.displayDialog = false;
          this.isFormSubmitted = false;
          this.spinner.hide();
        },
        (error) => {
          this.toastr.error(error.error.message, "Erreur");
          this.spinner.hide();
        },
        () => this.spinner.hide()
      )
    );
  }

  onCodeFuelPumpSearch(event: any) {
    this.subscriptions.add(
      this.fuelPumpService
        .find("pump.code~" + event.query)
        .subscribe((data) => (this.fuelPumpList = data))
    );
  }

  onReceptionSearch(event: any) {
    this.subscriptions.add(
      this.receptionService
        .find("code~" + event.query)
        .subscribe((data) => (this.receptionList = data))
    );
  }

  onSelectReception(event) {
    console.log(event.code);
    this.selectedAlimentationPump.reception = event;
    this.subscriptions.add(
      this.receptionLineService
        .find("reception.code~" + event.code)
        .subscribe((data) => {
          console.log(data);
          console.log(this.selectFuelPump.product.code);

          this.receptionLineList = data.filter(
            (f) => f.product.code === this.selectFuelPump.product.code
          );
        })
    );
  }

  onSelectReceptionLine(event) {
    console.log(event.value);
    this.selectedAlimentationPump.receptionLine = event.value;
  }
  onSelectFuelPump(event) {
    this.selectedAlimentationPump.fuelPump = event;
    this.selectFuelPump = this.selectedAlimentationPump.fuelPump;
  }

  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
