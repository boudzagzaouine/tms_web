import { Component, OnInit } from '@angular/core';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EmsBuffer } from '../../../shared/utils';
import { BadgeTypeService } from '../../../shared/services';
import { BadgeType } from '../../../shared/models';

@Component({
  selector: 'app-badge-type',
  templateUrl: './badge-type.component.html',
  styleUrls: ['./badge-type.component.css'],
  providers: [ConfirmationService]
})
export class BadgeTypeComponent implements OnInit {
  page = 0;
  size = 10;
  collectionSize: number;

  selectedBadgeType: BadgeType;
  searchQuery: string;
  codeSearch: string;
  items: MenuItem[];

  badgeTypeList: Array<BadgeType> = [];

  constructor(private badgeTypeService: BadgeTypeService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {

    this.items = [
      { label: 'View', icon: 'pi pi-search', command: (event) => this.onEdit() },
      { label: 'Delete', icon: 'pi pi-times', command: (event) => this.onDelete(this.selectedBadgeType.id) }
    ];
  }


  loadData(search: string = '') {

    this.spinner.show();
    this.badgeTypeService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    );
    this.badgeTypeService.findPagination(this.page, this.size, search).subscribe(
      data => {

        this.badgeTypeList = data;
        this.spinner.hide();
      },
      error => {


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
        this.badgeTypeService.delete(id).subscribe(
          data => {
            this.toastr.success("Elément Supprimer avec Succés","Suppression");
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

  onBqdgeTypeAdded(event) {
    this.loadData();
  }

}
