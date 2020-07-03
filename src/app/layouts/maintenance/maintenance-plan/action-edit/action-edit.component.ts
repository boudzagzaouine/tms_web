import { Router, ActivatedRoute } from "@angular/router";
import { ConfirmationService } from "primeng/api";
import { MaintenancePlan } from "./../../../../shared/models/maintenance-plan";
import { RoundPipe } from "ngx-pipes";
import { Product } from "./../../../../shared/models/product";
import { MaintenanceLine } from "./../../../../shared/models/maintenance-line";
import { Action } from "./../../../../shared/models/action";
import { ActionService } from "./../../../../shared/services/api/action.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-action-edit",
  templateUrl: "./action-edit.component.html",
  styleUrls: ["./action-edit.component.css"],
  providers: [RoundPipe],
})
export class ActionEditComponent implements OnInit {
  page = 0;
  size = 8;

  @Input() selectedMaintenanceLine = new MaintenanceLine();
  @Output() showDialog = new EventEmitter<boolean>();
  @Output() lineEdited = new EventEmitter<MaintenanceLine>();
  maintenanceLineList: Array<MaintenanceLine> = [];
  selectedActions = new Action();
  showDialogprdt: boolean;
  maintenanceForm: FormGroup;
  editMode = false;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = "Modifier une action";
  actionList: Array<Action> = [];
  actionSearch: Action;

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private actionService: ActionService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private roundPipe: RoundPipe
  ) {}

  ngOnInit() {
    this.title = "Ajouter une action";

    this.displayDialog = true;
    this.initForm();
  }
  initForm() {
    this.maintenanceForm = this.formBuilder.group({
      Fcode: new FormControl(
        { value: this.selectedMaintenanceLine.action, disabled: this.editMode },
        Validators.required
      ),
      FstatusMaintenance: new FormControl(
        this.selectedMaintenanceLine.maintenanceState
      ),
      Fdescription: new FormControl(this.selectedMaintenanceLine.action),
    });
  }

  onActionCodeSearch(event) {
    this.actionService.find("code~" + event.query).subscribe((data) => {
      this.actionList = data;
    });
  }
  onActionDescriptionSearch(event) {
    this.actionService.find("description~" + event.query).subscribe((data) => {
      this.actionList = data;
    });
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.maintenanceForm.invalid) {
      return;
    }
    this.selectedMaintenanceLine.action = this.selectedActions;
    this.lineEdited.emit(this.selectedMaintenanceLine);
    this.displayDialog = false;
  }

  onLineEdited(line: MaintenanceLine) {
    this.maintenanceLineList = this.maintenanceLineList.filter(
      (l) => l.product.id !== line.product.id
    );
    line.action=this.selectedActions;
    this.maintenanceLineList.push(line);
  }

  onDeleteMaintenanceLine(id: number) {
    this.confirmationService.confirm({
      message: "Voulez vous vraiment Suprimer?",
      accept: () => {
        this.maintenanceLineList = this.maintenanceLineList.filter(
          (l) => l.product.id !== id
        );
      },
    });
  }
 onSelect(event) {
    this.selectedActions = event;
    console.log(this.selectedActions);
  }
  onHideDialog() {
    let a = false;
    this.showDialog.emit(a);
    this.displayDialog = false;
  }

  onShowDialogPrdt(event) {
    this.showDialogprdt = true;
  }
  onHideDialogPrdt(event) {
    this.showDialogprdt = event;
  }

}
