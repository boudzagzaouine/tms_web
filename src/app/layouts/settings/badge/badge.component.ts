import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { BadgeService, BadgeTypeService } from './../../..//shared/services';
import { Badge } from '../../../shared/models';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';


@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css'],
  providers: [ConfirmationService]
})
export class BadgeComponent implements OnInit {

  page = 0;
  size = 10;
  collectionSize: number;

  selectedBadge: Badge;
  searchQuery = '';
  codeSearch: string;
  badgeTypeSearch: string;
  items: MenuItem[];

  badgeList: Array<Badge> = [];
  badgeTypeList: Array<string> = [];

  constructor(private badgeService: BadgeService,
    private badgeTypeService: BadgeTypeService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.items = [
      { label: 'View', icon: 'pi pi-search', command: (event) => this.onEdit() },
      { label: 'Delete', icon: 'pi pi-times', command: (event) => this.onDelete(this.selectedBadge.id) }
    ];
  }


  loadData() {

    console.log(`search query : ${this.searchQuery}`);

    this.spinner.show();
    this.badgeService.sizeSearch(this.searchQuery).subscribe(
      data => {
        this.collectionSize = data;
      }
    );
    this.badgeService.findPagination(this.page, this.size, this.searchQuery).subscribe(
      data => {
        console.log(data);
        this.badgeList = data;
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.toastr.error('Erreur de connexion')
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

    if (this.badgeTypeSearch != null && this.badgeTypeSearch !== '') {
      buffer.append(`badgeType.code~${this.badgeTypeSearch}`);
    }

    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData();

  }

  onBadgeTypeSearch(event: any) {
    this.badgeTypeService.find('code~' + event.query).subscribe(
      data => this.badgeTypeList = data.map(f => f.code)
    );
  }

  reset() {
    this.codeSearch = null;
    this.badgeTypeSearch = null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData();
  }

  onDelete(id: number) {
    this.confirmationService.confirm({
      message: 'Voulez vous vraiment Suprimer?',
      accept: () => {
        this.badgeService.delete(id).subscribe(
          data =>{
            this.toastr.success("Supprimer avec Succes","Suppression");
            console.log("delete Bdge");
              console.log(id);
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
  onBqdgeAdd(event) {
    this.loadData();
  }
}
