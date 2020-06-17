import { SupplierService } from './../../../shared/services/api/supplier.service';
import { Supplier } from './../../../shared/models/supplier';
import { Component, OnInit } from '@angular/core';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EmsBuffer } from '../../../shared/utils';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {


  page = 0;
  size = 10;
  collectionSize: number;
  searchQuery = '';
  codeSearch: string;
  selectSuppliers: Array<Supplier> = [];
  suppplierList: Array<Supplier> = [];
  codesuppplierList: Array<Supplier> = [];

  cols: any[];
  showDialog: boolean;
  editMode: number;
  className: String;


  constructor(private supplierService: SupplierService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {


    this.className = Supplier.name;
    this.cols = [
      { field: 'code', header: 'Code',type:'string' },
      { field: 'description', header: 'Description',type:'string' },
      { field: 'name', header: 'Nom' ,type:'string'},
      { field: 'tel1', header: 'Tele 1' ,type:'string'},
      { field: 'tel2', header: 'Tele 2' ,type:'string'},
      { field: 'fax', header: 'Fax' ,type:'string'},
      { field: 'email', header: 'Email' ,type:'string'},
      { field: 'address', header: 'Addresse 1' ,type:'string'},
      { field: 'line2', header: 'Addresse 2' ,type:'string'},
      { field: 'zip', header: 'Code postale' ,type:'string'},
      { field: 'city', header: 'Ville',type:'string' },
      { field: 'country', header: 'Pays' ,type:'string'},
    ];


    this.loadData();
    console.log("test");
    console.log("");



  }

  loadData() {


    this.spinner.show();
    this.supplierService.sizeSearch(this.searchQuery).subscribe(
      data => {
        this.collectionSize = data;
      }
    );
    this.supplierService.findPagination(this.page, this.size, this.searchQuery).subscribe(
      data => {
        this.suppplierList = data;
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.toastr.error('Erreur de connexion');
      },
      () => this.spinner.hide()
    );
  }
  loadDataLazy(event) {
    this.page = event.first / this.size;
    console.log('first : ' + event.first);
    this.loadData();
  }
  onNameSearch(event: any) {
    this.supplierService.find('code~' + event.query).subscribe(
      data => this.codesuppplierList = data.map(f => f.code)
    );
  }
  onSearchClicked() {

    const buffer = new EmsBuffer();
    if (this.codeSearch != null && this.codeSearch !== '') {
      buffer.append(`code~${this.codeSearch}`);
    }

    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData();

  }



  reset() {

    this.page = 0;
    this.searchQuery = '';
    this.loadData();
  }


  onTanrsportAdd(event) {
    this.loadData();
  }

  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectSuppliers = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }

  }

  onDeleteAll() {

    if (this.selectSuppliers.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Suprimer?',
        accept: () => {
          const ids = this.selectSuppliers.map(x => x.id);
          this.supplierService.deleteAllByIds(ids).subscribe(
            data => {
              this.toastr.success('Elément Supprimer avec Succés', 'Suppression');
              this.loadData();
            },
            error => {
              this.toastr.error(error.error.message, 'Erreur');
            },
            () => this.spinner.hide()
          );
        }
      });
    } else if (this.selectSuppliers.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }
  }

  onShowDialog(event) {
    this.showDialog = event;
    this.loadData();
  }




}
