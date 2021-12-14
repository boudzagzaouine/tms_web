import { TurnLine } from './../../../../shared/models/turn-line';
import { TurnLineService } from './../../../../shared/services/api/turn-line.service';
import { TurnService } from './../../../../shared/services/api/turn.service';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from './../../../../shared/services/api/account.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Turn } from './../../../../shared/models/turn';
import { VehicleCategory } from './../../../../shared/models/vehicle-category';
import { DriverService } from './../../../../shared/services/api/driver.service';
import { VehicleService } from './../../../../shared/services/api/vehicle.service';
import { TransportServcie } from './../../../../shared/services/api/transport.service';
import { VehicleCategoryService } from './../../../../shared/services/api/vehicle-category.service';
import { Component, OnInit } from '@angular/core';
import { Account } from './../../../../shared/models';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {


  vehicleCatList: VehicleCategory[] = [];
  transportList: Array<any> = [];
  vehicleList: Array<any> = [];
  driverList: Array<any> = [];
  selectTurn: Turn = new Turn();
  accountList: Account[] = [];
  idTurn: number;
  turnForm: FormGroup;

  turnLines: TurnLine[] = [];
  turnLinesL: TurnLine[] = [];

  turnSelected: Turn[] = [];


  constructor(private vehicleCategoryService: VehicleCategoryService,
    private transportService: TransportServcie,
    private vehicleService: VehicleService,
    private driverService: DriverService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private turnService: TurnService,
    private turnLineService: TurnLineService,



  ) { }

  ngOnInit() {
    this.initForm();


    this.vehicleCategoryService.findAll().subscribe(data => {
      this.vehicleCatList = data;
    });

    this.transportService.findAll().subscribe(data => {
      this.transportList = data;
    });

    this.driverService.findAll().subscribe(data => {
      this.driverList = data;
    });

    this.accountService.findAll().subscribe(data => {
      this.accountList = data;
    });



    if (this.route.snapshot.params['id'] >= 1) {
      this.idTurn = this.route.snapshot.params['id'];
      this.turnService.findById(this.idTurn).subscribe(
        data => {
          this.selectTurn = data;
          console.log(this.selectTurn);

       //   this.charger();

          this.initForm();
        }
      );


    }



  }
//   charger() {

//     this.turnLineService.findAll().subscribe(
//       data => {
//         this.turnLines = data;
//  console.log("data turn line ");

//         console.log(this.turnLines);

//          this.turnLines = this.turnLines.filter(p => ((p.turn.id) === this.idTurn));

//          this.turnLinesL.push(this.turnLines[0]);
//          console.log("turnlines L");
//          console.log(this.turnLinesL);


//         for (let i = 0; i < this.turnLines.length; i++) {

//            if (this.turnLines[i].saleOrder.code !== this.turnLinesL[i].saleOrder.code) {

//            this.turnLinesL.push(this.turnLines[i]);
//            }
//          }

//         console.log('afficher Turn Line ');
//          console.log(this.turnLines);




//       }
//     );

//   }
  initForm() {
    const d = new Date(this.selectTurn.dateDelivery);
    this.turnForm = new FormGroup({
      fDateLivraison: new FormControl(
        d,
        Validators.required
      ),
      fVehicule: new FormControl('', Validators.required),
      fTransport: new FormControl(
      '',
        Validators.required
      ),
      fDrivers: new FormControl('', Validators.required),
      fTypeVehicule: new FormControl('', Validators.required)
    });
  }

}
