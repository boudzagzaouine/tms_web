import { Component, OnInit } from '@angular/core';
import { TmsdashboardService } from './../../../shared/services/api/tms-dashboard.service';
import { Transport } from './../../../shared/models/transport';
import { TransportServcie } from './../../../shared/services/api/transport.service';
import { DatePipe } from '@angular/common';

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
  dateDepartSearch: Date;
  dateFinSearch: Date;
  data: any;
  options: any;
  validertransport: number = 0;
  rejectedtransport: number = 0;

  constructor(
    public datepipe: DatePipe,
    private tmsDashboardService: TmsdashboardService,
    private tranportService: TransportServcie) { }

  ngOnInit(): void {
  }

  onNameSearch(event: any) {

    this.tranportService.find('name~' + event.query).subscribe(
      data => this.nameList = data
    );

  }

  onSearchClicked() {
    var transportId;
    var oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    var dateDepart = oneYearAgo;
    var dateFin = new Date();
    console.log(dateDepart, dateFin);
    if (this.nameSearch != null && this.nameSearch.name !== '') transportId = this.nameSearch.id;
    if (this.dateDepartSearch != null && this.dateFinSearch != null) {
      dateDepart = this.dateDepartSearch;
      dateFin = this.dateFinSearch;
    }

    this.tmsDashboardService.getrefusedtransport(transportId, this.datepipe.transform(dateDepart, 'yyyy/MM/dd'), this.datepipe.transform(dateFin, 'yyyy/MM/dd'))
      .subscribe(
        data => {
          this.refusedtransport = data ? data : 0;

        });

    this.tmsDashboardService.getcanceledtransport(transportId, this.datepipe.transform(dateDepart, 'yyyy/MM/dd'), this.datepipe.transform(dateFin, 'yyyy/MM/dd'))
      .subscribe(
        data => {
          this.canceledtransport = data ? data : 0;

        });
    this.tmsDashboardService.getrejectededtransport(transportId, this.datepipe.transform(dateDepart, 'yyyy/MM/dd'), this.datepipe.transform(dateFin, 'yyyy/MM/dd'))
      .subscribe(
        data => {
          this.rejectedtransport = data ? data : 0;

        });
    this.tmsDashboardService.getvalidertransport(transportId, this.datepipe.transform(dateDepart, 'yyyy/MM/dd'), this.datepipe.transform(dateFin, 'yyyy/MM/dd'))
      .subscribe(
        data => {
          this.validertransport = data ? data : 0;
          console.log(this.refusedtransport, this.canceledtransport, this.validertransport, this.rejectedtransport)

          this.onChartTransport()
        });


  }
  reset() {
    this.nameSearch = null;
    this.dateDepartSearch = null;
    this.dateFinSearch = null;
  }

  onChartTransport() {
    const documentStyle = getComputedStyle(document.documentElement);
    console.log(this.canceledtransport, this.rejectedtransport, this.refusedtransport, this.validertransport)
    this.data = {
      labels: ['Annulé', 'Rejecté', 'Refusé', 'Validé'],
      datasets: [
        {
          data: [this.canceledtransport, this.rejectedtransport, this.refusedtransport, this.validertransport],
          backgroundColor:
            [documentStyle.getPropertyValue('--green-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--orange-500')],
          hoverBackgroundColor:
            [documentStyle.getPropertyValue('--green-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--orange-400'),]
        }
      ]
    };
    this.options = {

      legend: {
        labels: {
          usePointStyle: true
        }
      }

    };
  }
}
