import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { InsuranceTermService } from './../../../shared/services';
import { EmsBuffer } from './../../../shared/utils';
import { InsuranceTerm } from './../../../shared/models';

@Component({
  selector: 'app-insurance-term',
  templateUrl: './insurance-term.component.html',
  styleUrls: ['./insurance-term.component.css']
})
export class InsuranceTermComponent implements OnInit {

  page = 0;
  size = 10;
  collectionSize: number;

  selectedInsuranceTerm: InsuranceTerm;
  searchQuery = '';
  codeSearch: string;
  items: MenuItem[];

  insuranceTermList: Array<InsuranceTerm> = [];

  constructor(private insuranceTermService: InsuranceTermService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
      this.items = [
      { label: 'View', icon: 'pi pi-search', command: (event) => this.onEdit() },
      { label: 'Delete', icon: 'pi pi-times', command: (event) => this.onDelete(this.selectedInsuranceTerm.id) }
    ];
  }


  loadData(search: string = '') {
    console.log(`search query : ${this.searchQuery}`);

    this.spinner.show();
    this.insuranceTermService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    );
    this.insuranceTermService.findPagination(this.page, this.size, search).subscribe(
      data => {
        console.log(data);
        this.insuranceTermList = data;
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
        this.insuranceTermService.delete(id).subscribe(
          data => {
            this.toastr.success("Supprimer avec Succes","Suppression");
            this.loadData();
          },
          error=>{
           this.toastr.error("Erreur De La Suppression","Suppression");

         }
        );
      }
    });
  }

  onEdit() {
    this.toastr.info('selected ');
  }

 onInssuranceTermAdd(event){
   this.loadData();
 }
}
