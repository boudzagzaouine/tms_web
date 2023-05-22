import { Component, OnInit } from '@angular/core';
import { TmsDashboardService } from './../../../shared/services/api/tms-dashboard.service';
import { Transport } from './../../../shared/models/transport';
import { TransportServcie } from './../../../shared/services/api/transport.service';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent implements OnInit {

  nameSearch: Transport;
  nameList: Array<Transport> = [];
  refusedtransport: number = 0;
  canceledtransport: number = 0;

  validertransport: number = 0;
  rejectedtransport: number = 0;

  constructor(private tmsDashboardService: TmsDashboardService, private tranportService: TransportServcie) { }

  ngOnInit(): void {
  }

  onNameSearch(event: any) {

    this.tranportService.find('name~' + event.query).subscribe(
      data => this.nameList = data
    );

  }
  onSearchClicked() {
    var transportId = 0
    if (this.nameSearch != null && this.nameSearch.name !== '') transportId = this.nameSearch.id;

    this.tmsDashboardService.getrefusedtransport(transportId)
      .subscribe( 
        data => {
          this.refusedtransport = data ? data : 0;
          console.log(data);
        });

    this.tmsDashboardService.getcanceledtransport(transportId)
      .subscribe(
        data => {
          this.canceledtransport = data ? data : 0;
          console.log(data);
        });
    this.tmsDashboardService.getrejectededtransport(transportId)
      .subscribe(
        data => {
          this.rejectedtransport = data ? data : 0;
          console.log(data);
        });
        this.tmsDashboardService.getvalidertransport(transportId)
        .subscribe(
          data => {
            this.validertransport = data ? data : 0;
            console.log(data);
          });

  }
  reset() {
    this.nameSearch = null;
  }
}
