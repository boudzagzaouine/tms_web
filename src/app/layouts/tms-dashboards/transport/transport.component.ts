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
  searched: boolean = false;

  /** Total plans across all outcomes (derived, no extra request). */
  get totaltransport(): number {
    return this.refusedtransport + this.canceledtransport + this.rejectedtransport + this.validertransport;
  }

  /** Share of plans actually carried out. */
  get successRate(): number {
    return this.totaltransport ? Math.round((this.validertransport / this.totaltransport) * 100) : 0;
  }

  /** Share of plans lost (cancelled + rejected + refused). */
  get failureRate(): number {
    return this.totaltransport ? 100 - this.successRate : 0;
  }

  constructor(
    public datepipe: DatePipe,
    private tmsDashboardService: TmsdashboardService,
    private tranportService: TransportServcie) { }

  ngOnInit(): void {
    // Open with all carriers: run the default (last-year) search with no transporteur filter.
    this.onSearchClicked();
  }

  onNameSearch(event: any) {
    this.tranportService.find('name~' + event.query).subscribe(
      data => this.nameList = data || [],
      () => this.nameList = []   // e.g. 403 when the account lacks TRANSPORT_VIEW
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
          this.searched = true;
          this.onChartTransport()
        });


  }
  reset() {
    this.nameSearch = null;
    this.dateDepartSearch = null;
    this.dateFinSearch = null;
  }

  onChartTransport() {
    this.data = {
      labels: ['Annulé', 'Rejecté', 'Refusé', 'Validé'],
      datasets: [
        {
          data: [this.canceledtransport, this.rejectedtransport, this.refusedtransport, this.validertransport],
          // Annulé / Rejecté / Refusé / Validé — intuitive outcome colours.
          backgroundColor: ['#e34948', '#eb6834', '#eda100', '#1baf7a'],
          hoverBackgroundColor: ['#e66767', '#ef8a5f', '#f2b733', '#3cc593'],
          borderColor: '#ffffff',
          borderWidth: 2
        }
      ]
    };
    const total = this.totaltransport;
    this.options = {
      cutoutPercentage: 62, // doughnut
      legend: {
        position: 'right',
        labels: { usePointStyle: true, fontColor: '#52514e', padding: 16 }
      },
      tooltips: {
        callbacks: {
          label: (item: any, data: any) => {
            const value = data.datasets[0].data[item.index] || 0;
            const pct = total ? Math.round((value / total) * 100) : 0;
            return ` ${data.labels[item.index]}: ${value} (${pct}%)`;
          }
        }
      }
    };
  }
}
