import { AddressService } from "./../../../../shared/services/api/address.service";
import { Address } from "./../../../../shared/models/address";
import { TransportServcie } from "./../../../../shared/services/api/transport.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Transport } from "./../../../../shared/models/transport";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-transport-edit",
  templateUrl: "./transport-edit.component.html",
  styleUrls: ["./transport-edit.component.css"]
})
export class TransportEditComponent implements OnInit {
  @Input() selectedtransport = new Transport();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  transportForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = "Modifier un transport";
  selectAddress = new Address();
  constructor(
    private transportService: TransportServcie,
    private addressService: AddressService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    console.log(this.editMode);

    if (this.editMode === 1) {
      this.selectedtransport = new Transport();
      this.title = "Ajouter un transport";
    } else {
      this.selectAddress = this.selectedtransport.address;
    }
    this.displayDialog = true;
    this.initForm();
  }

  initForm() {
    this.transportForm = new FormGroup({
      code: new FormControl(this.selectedtransport.code, Validators.required),
      name: new FormControl(this.selectedtransport.name, Validators.required),
      description: new FormControl(this.selectedtransport.description),
      line1: new FormControl(
        this.selectAddress.line1 ? this.selectAddress.line1 : null,
        Validators.required
      ),
      line2: new FormControl(this.selectAddress.line2),
      city: new FormControl(this.selectAddress.city),
      country: new FormControl(this.selectAddress.country),
      zip: new FormControl(this.selectAddress.zip)
    });
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.transportForm.invalid) {
      return;
    }
    this.spinner.show();
    this.selectedtransport.code = this.transportForm.value["code"];
    this.selectedtransport.name = this.transportForm.value["name"];
    this.selectedtransport.description = this.transportForm.value[
      "description"
    ];
    this.selectedtransport.active = true;

    this.selectAddress.code = this.transportForm.value["code"];
    this.selectAddress.line1 = this.transportForm.value["line1"];
    this.selectAddress.line2 = this.transportForm.value["line2"];
    this.selectAddress.city = this.transportForm.value["city"];
    this.selectAddress.country = this.transportForm.value["country"];
    this.selectAddress.zip = this.transportForm.value["zip"];

    this.addressService.set(this.selectAddress).subscribe(dataA => {
      this.selectedtransport.address = dataA;

      this.transportService.set(this.selectedtransport).subscribe(
        data => {
          this.toastr.success("Elément est Enregistré avec succès", "Edition");
          // this.loadData();
          this.displayDialog = false;
          this.isFormSubmitted = false;
          this.spinner.hide();
        },
        error => {
          this.toastr.error(error.error.message, "Erreur");
          this.spinner.hide();
        },
        () => this.spinner.hide()
      );
    });
  }
  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }
}
