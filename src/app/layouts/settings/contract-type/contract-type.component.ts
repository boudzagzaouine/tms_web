import { Component, OnInit } from '@angular/core';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContractTypeService } from '../../../shared/services';
import { EmsBuffer } from '../../../shared/utils';
import { ContractType } from '../../../shared/models';

@Component({
  selector: 'app-contract-type',
  templateUrl: './contract-type.component.html',
  styleUrls: ['./contract-type.component.css']
})
export class ContractTypeComponent implements OnInit {

  page = 0;
  size = 10;
  collectionSize: number;

  selectedContractType: ContractType;
  searchQuery: string;
  codeSearch: string;
  items: MenuItem[];

  contractTypeList: Array<ContractType> = [];

  constructor(private contractTypeService: ContractTypeService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
      this.items = [
      { label: 'View', icon: 'pi pi-search', command: (event) => this.onEdit() },
      { label: 'Delete', icon: 'pi pi-times', command: (event) => this.onDelete(this.selectedContractType.id) }
    ];
  }


  loadData(search: string = '') {
    console.log(`search query : ${this.searchQuery}`);

    this.spinner.show();
    this.contractTypeService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    );
    this.contractTypeService.findPagination(this.page, this.size, search).subscribe(
      data => {
        console.log(data);
        this.contractTypeList = data;
        this.spinner.hide();
      },
      error => {
        console.log(error);

        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }
  loadDataLazy(event) {
    this.page = event.first / this.size;
    console.log('first : ' + event.first);
    this.loadData(this.searchQuery);
  }

  onSearchClicked() {
    const buffer = new EmsBuffer();
    if (this.codeSearch != null && this.codeSearch !== '') {
      buffer.append(`code~${this.codeSearch}`);
    }

    this.page = 0;
    this.searchQuery = buffer.getValue();
    console.log(this.searchQuery);

    this.loadData(this.searchQuery);

  }

  reset() {
    this.codeSearch = null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData(this.searchQuery);
  }

  onDelete(id: number) {
    this.confirmationService.confirm({
      message: 'Voulez vous vraiment Suprimer?',
      accept: () => {
        this.contractTypeService.delete(id).subscribe(
          data => {
            this.toastr.success("Supprimer avec Succes","Suppression");
            this.loadData();
          },
          error=>{
           this.toastr.error("Erreur De La Suppression","Suppression");

         }
        );
        this.loadData();
      }
    });
  }

  onEdit() {
    this.toastr.info('selected ');
  }
onContactTypeAdd(event){
 this.loadData();
}
}
