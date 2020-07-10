import { TransportCategoryVehicleComponent } from "./../../../layouts/settings/transport-category-vehicle/transport-category-vehicle.component";
import { Observable } from "rxjs";
import { EmittedOBject } from "./emitted-object";
import { UserService } from "./../../services/api/user.service";
import { AuthenticationService } from "./../../services/api/authentication.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { User } from "./../../models/user";
import { MenuItem, ConfirmationService, SortEvent } from "primeng/api";
import { Columns } from "./../../models/column";
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";

@Component({
  selector: "app-data-table",
  templateUrl: "./data-table.component.html",
  styleUrls: ["./data-table.component.css"]
})
export class DataTableComponent implements OnInit {
  @Input() tableId;
  @Input() page = 0;
  @Input() size;
  @Input() collectionSize: number;
  @Input() objectList: Array<any> = [];
  @Input() objectExportList: Array<any> = [];
  @Input() _selectedColumns: Array<any> = [];
  @Input() cols: any[];
  @Input() className: String;
  @Input() listName: String;
  @Input() addBtnVisible = false;
  @Input() viewBtnVisible = false;
  @Input() updateBtnVisible = false;
  @Input() deleteBtnVisible = false;
  @Output() lazyLoadData = new EventEmitter<any>();
  @Output() objectEdited = new EventEmitter<EmittedOBject>();
  @Output() exportBtnExcelGlobal = new EventEmitter<any[]>();
  @Output() exportBtnExcelVue = new EventEmitter<any[]>();
  @Output() exportBtnPdf = new EventEmitter<any[]>();

  exportColumns: any[];
  columnsAdded: any[];
  columnsMapped: any[];
  exportBtnItems: MenuItem[];
  selectedObjects: Array<any> = [];
  user = new User();
  updateBtnDisable = false;
  deleteBtnDisable = false;

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private authUser: AuthenticationService,
    private userservice: UserService
  ) {}

  ngOnInit() {
    this.loadColumns();
  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.cols.filter(col => val.includes(col));
  }

  loadColumns() {
    this.user = this.authUser.getCurrentUser();
    console.log("user colm");
    console.log(this.user.columns);

    if (this.user.columns != null && this.user.columns !== "") {
      this.columnsAdded = JSON.parse(this.user.columns);
      this.columnsMapped = this.columnsAdded.filter(
        tab => tab.classe === this.className
      );

      if (this.columnsMapped.length >= 1) {
        for (let i = 0; i < this.cols.length; i++) {
          for (let j = 0; j < this.columnsMapped.length; j++) {
            if (this.cols[i].field === this.columnsMapped[j].field) {
              this.selectedColumns.push(this.cols[i]);
            }
          }
        }
      } else {
        this.selectedColumns = this.cols;
      }
    } else {
      this.selectedColumns = this.cols;
    }
    this.exportColumns = this.selectedColumns.map(col => ({
      title: col.header,
      dataKey: col.field
    }));

    console.log("class name");

    console.log(this.className);

    console.log("column select");

    console.log(this.selectedColumns);

    console.log("cols ");

    console.log(this.cols);
  }
  typeOf(event) {
    let res: number;

    if (event === "object") {
      res = 1;
    } else if (event === "number" || event === "string") {
      res = 2;
    } else if (event === "date") {
      res = 3;
    } else if (event === "boolean") {
      res = 4;
    }

    return res;
  }

  exportExcelVue(): void {
    this.exportBtnExcelVue.emit(this.selectedColumns);
  }

  exportPdf(): void {
    this.exportBtnPdf.emit(this.selectedColumns);
  }

  exportExcelGlobal(): void {
    this.exportBtnExcelGlobal.emit(null);
  }

  onEdit(event) {
    console.log(event);
    this.objectEdited.emit({
      object: this.selectedObjects,
      operationMode: event
    });
    this.selectedObjects = [];
  }

  loadDataLazy(event) {
    // this.size = event.rows;
    // this.page = event.first / this.size;
    this.lazyLoadData.emit(event);
  }

  onRowSelect(event) {
    if (this.selectedObjects.length === 1) {
      this.updateBtnDisable = true;
      this.deleteBtnDisable = true;
    } else {
      this.updateBtnDisable = false;
    }
    console.log(event);

  }
  onRowUnselect(event) {
    if (this.selectedObjects.length === 1) {
      this.updateBtnDisable = true;
    } else if (this.selectedObjects.length < 1) {
      this.updateBtnDisable = false;
      this.deleteBtnDisable = false;
    }
  }

  onSaveView(event) {
    console.log(this.className);

    console.log(this.columnsAdded);

    this.spinner.show();

    this.columnsAdded = this.columnsAdded.filter(
      col => col.classe !== this.className
    );
    console.log(this.columnsAdded);

    for (let i = 0; i < this.selectedColumns.length; i++) {
      let c = new Columns();
      c.position = i;
      c.field = this.selectedColumns[i].field;
      c.header = this.selectedColumns[i].header;
      c.classe = this.className;
      c.type = this.selectedColumns[i].type;
      c.child = this.selectedColumns[i].child;
      this.columnsAdded.push(c);
    }
    console.log(this.columnsAdded);

    this.user = this.authUser.getCurrentUser();
    this.user.columns = JSON.stringify(this.columnsAdded);
    this.authUser.setuser(this.user);
    this.userservice.set(this.user).subscribe(
      data => {
        this.toastr.success("La vue a été enregistrée avec Succés", "Edition");
      },
      error => {
        this.toastr.error(error.error.message, "Erreur");
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }
}
