import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { ConsumptionTypeService } from './../../../shared/services/api/consumption-type.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { ConsumptionType } from './../../../shared/models/consumption-type';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comsumption-type',
  templateUrl: './comsumption-type.component.html',
  styleUrls: ['./comsumption-type.component.css']
})
export class ComsumptionTypeComponent implements OnInit {

  page = 0;
  size = 10;
  collectionSize: number;

  selectedConsumptionType: ConsumptionType;
  searchQuery = '';
  codeSearch: string;
  items: MenuItem[];

  consumptionTypeList: Array<ConsumptionType> = [];

  constructor(private consumptionTypeService: ConsumptionTypeService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.items = [
      { label: 'View', icon: 'pi pi-search', command: (event) => this.onEdit() },
      { label: 'Delete', icon: 'pi pi-times', command: (event) => this.onDelete(this.selectedConsumptionType.id) }
    ];
  }


  loadData() {

    console.log(`search query : ${this.searchQuery}`);

    this.spinner.show();
    this.consumptionTypeService.sizeSearch(this.searchQuery).subscribe(
      data => {
        this.collectionSize = data;
      }
    );
    this.consumptionTypeService.findPagination(this.page, this.size, this.searchQuery).subscribe(
      data => {
        console.log(data);
        this.consumptionTypeList = data;
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
    this.codeSearch = null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData();
  }

  onDelete(id: number) {
    this.confirmationService.confirm({
      message: 'Voulez vous vraiment Supprimer?',
      accept: () => {
        this.consumptionTypeService.delete(id).subscribe(
          data =>{
            this.toastr.success('Elément est Supprimé Avec Succès', 'Suppression');

                 this.loadData();
       },
       error=>{
        this.toastr.error(error.error.message);

      }
        );

      }
    });
  }

  onEdit() {
    this.toastr.info('selected ');
  }
  onconsumptiontypeAdd(event) {
    this.loadData();
  }

}
