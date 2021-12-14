import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { TurnService } from './../../../shared/services/api/turn.service';
import { DriverService } from './../../../shared/services/api/driver.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { BadgeTypeService } from './../../../shared/services/api/badge-type.service';
import { VehicleCategoryService } from './../../../shared/services/api/vehicle-category.service';
import { VehicleService } from './../../../shared/services/api/vehicle.service';
import { Vehicle } from './../../../shared/models/vehicle';
import { Turn } from './../../../shared/models/turn';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalService } from './../../../shared/services/api/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-turn-list',
  templateUrl: './turn-list.component.html',
  styleUrls: ['./turn-list.component.css']
})
export class TurnListComponent implements OnInit {


  // page = 0;
  // size = 10;
  // collectionSize: number;

  // selectedTurn: Turn;
  // searchQuery = '';
  // dateLivraisonSearch: Date;
  // dateDelivery: Date;
  // matSearch: string;
  // categorySearch: string;
  // vehicleSearch: string;

  // turnList: Array<Turn> = [];
  // vehicleCategoryList: Array<string> = [];
  // driverList: Array<string> = [];

  // constructor(private turnService: TurnService,
  //   private vehicleCategoryService: VehicleCategoryService,
  //   private driverService: DriverService,
  //   private spinner: NgxSpinnerService,
  //   private toastr: ToastrService,
  //   private confirmationService: ConfirmationService) { }

  // ngOnInit() {

  //   this.loadData();
  //  }


  // loadData(search: string = '') {

  //   console.log(`search query : ${this.searchQuery}`);

  //   this.spinner.show();
  //   this.turnService.sizeSearch(search).subscribe(
  //     data => {
  //       this.collectionSize = data;
  //     }
  //   );
  //   this.turnService.findPagination(this.page, this.size, search).subscribe(
  //     data => {
  //       console.log(data);
  //       this.turnList = data;
  //       this.spinner.hide();
  //     },
  //     error => { this.spinner.hide() },
  //     () => this.spinner.hide()
  //   );
  // }
  // loadDataLazy(event) {
  //   this.page = event.first / this.size;
  //   console.log('first : ' + event.first);
  //   this.loadData(this.searchQuery);
  // }

  // onSearchClicked() {

  //   const buffer = new EmsBuffer();
  //   if (this.dateLivraisonSearch != null && this.dateLivraisonSearch !== undefined) {
  //     buffer.append(`dateDelivery~${this.dateLivraisonSearch}`);
  //   }


  //   this.page = 0;
  //   this.searchQuery = buffer.getValue();
  //   this.loadData(this.searchQuery);

  // }

  // reset() {
  //   this.dateDelivery = null;
  //   this.matSearch = null;
  //   this.categorySearch = null;
  //   this.vehicleSearch = null;
  //   this.page = 0;
  //   this.searchQuery = '';
  //   this.loadData(this.searchQuery);
  // }

  // onDelete(id: number) {
  //   this.confirmationService.confirm({
  //     message: 'Voulez vous vraiment Suprimer?',
  //     accept: () => {
  //       this.turnService.delete(id).subscribe(
  //         data=>{
  //           this.toastr.success('Elément est Supprimé Avec Succès', 'Supprssion');
  //           this.loadData();
  //         },
  //        err=>{
  //         this.toastr.error(err.arror.message);

  //        }
  //       );
  //     }
  //   });
  // }

  // onSelectVehcileCategory() {
  //   console.log(this.categorySearch);

  // }




  page = 0;
  size = 10;
  collectionSize: number;
  searchQuery = '';
  codeSearch: Turn;


  selectedTurns: Array<Turn> = [];
  turnList: Array<Turn> = [];
  className: string;
  cols: any[];
  editMode: number;
  showDialog: boolean;
  TurnExportList: Array<Turn> = [];
  titleList = 'Liste des Turns';
  subscriptions= new Subscription();

  items: MenuItem[];
    
  home: MenuItem;


   dateLivraisonSearch: Date;
   dateDelivery: Date;
  constructor(private TurnService: TurnService,
 
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private router: Router) { }

  ngOnInit() {

    this.items = [
      {label: 'Turn'},
      {label: 'Lister'},
   
  ];
  
  this.home = {icon: 'pi pi-home'};

    this.className = Turn.name;
    this.cols = [
      { field: 'dateDelivery', header: 'Date Tournée', type: 'date' },
      { field: 'turnType', child: 'code', header: 'Type Turnée', type: 'object' },
    


    ];

    
  }

  onExportExcel(event) {

    this.subscriptions.add(  this.TurnService.find(this.searchQuery).subscribe(
      data => {
        this.TurnExportList = data;
        if (event != null) {
          this.globalService.generateExcel(event, this.TurnExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.TurnExportList, this.className, this.titleList);

        }
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));


  }
  onExportPdf(event) {
    this.subscriptions.add( this.TurnService.find(this.searchQuery).subscribe(
      data => {
        this.TurnExportList = data;
        this.globalService.generatePdf(event, this.TurnExportList, this.className, this.titleList);
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));

  }
  loadData(search: string = '') {
    this.spinner.show();
    this.subscriptions.add(this.TurnService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    ));
    this.subscriptions.add( this.TurnService.findPagination(this.page, this.size, search).subscribe(
      data => {

        this.turnList = data;
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));
  }
  loadDataLazy(event) {
    this.size = event.rows;
    this.page = event.first / this.size;
    this.loadData(this.searchQuery);
  }

  onSearchClicked() {

    const buffer = new EmsBuffer();
    if (this.dateLivraisonSearch != null && this.dateLivraisonSearch !== undefined) {
      buffer.append(`dateDelivery~${this.dateLivraisonSearch}`);
    }
    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery);

  }


  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectedTurns = event.object;

    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
      this.router.navigate(['/core/turn/edit/', this.selectedTurns[0].id]);
    }

  }

  reset() {
    this.codeSearch = null;

    this.page = 0;
    this.searchQuery = '';
    this.loadData(this.searchQuery);
  }




  onDeleteAll() {

    if (this.selectedTurns.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Suprimer?',
        accept: () => {
          const ids = this.selectedTurns.map(x => x.id);
          this.subscriptions.add( this.TurnService.deleteAllByIds(ids).subscribe(
            data => {
              this.toastr.success('Elément Supprimer avec Succés', 'Suppression');
              this.loadData();
            },
            error => {
              this.toastr.error(error.error.message, 'Erreur');
            },
            () => this.spinner.hide()
          ));
        }
      });
    } else if (this.selectedTurns.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }


}



