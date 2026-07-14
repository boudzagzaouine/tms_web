import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { forkJoin } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { TransportPlanService } from './../../../shared/services/api/transport-plan.service';
import { OrderTransportService } from './../../../shared/services/api/order-transport.service';

/**
 * "Vue d'ensemble" — a from-scratch operations overview built entirely on
 * real, countable data (sizeSearch on orderTransports / transportPlans),
 * so it works without the per-environment KPI stored functions the older
 * dashboards depend on.
 */
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  breadcrumbItems: MenuItem[];
  home: MenuItem;
  dateSearch: Date[];
  loading = false;

  // Transport plans (the delivery operations)
  plansTotal = 0;
  plansActive = 0;
  plansDone = 0;
  plansCanceled = 0;

  // Order transports
  ordersTotal = 0;
  stCree = 0;
  stValide = 0;
  stFerme = 0;
  stAnnule = 0;
  tpAller = 0;
  tpRetour = 0;
  tpAllerRetour = 0;

  statusData: any;
  statusOptions: any;
  typeData: any;
  typeOptions: any;

  constructor(
    private planService: TransportPlanService,
    private orderService: OrderTransportService,
    private datePipe: DatePipe,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.breadcrumbItems = [{ label: 'Tableaux de bord' }, { label: "Vue d'ensemble" }];
    this.home = { icon: 'pi pi-home' };
    this.load();
  }

  /** Completion rate of the delivery plans. */
  get tauxRealisation(): number {
    return this.plansTotal ? Math.round((this.plansDone / this.plansTotal) * 100) : 0;
  }
  get ordersOther(): number {
    return Math.max(0, this.ordersTotal - this.stCree - this.stValide - this.stFerme - this.stAnnule);
  }

  /** Build a "field>du[,field<au]" date clause from the range picker. */
  private dateClause(field: string): string {
    if (!this.dateSearch || !this.dateSearch[0]) return '';
    const du = this.datePipe.transform(this.dateSearch[0], 'yyyy-MM-dd');
    const au = this.dateSearch[1] ? this.datePipe.transform(this.dateSearch[1], 'yyyy-MM-dd') : null;
    return au ? `${field}>${du},${field}<${au}` : `${field}>${du}`;
  }

  /** Join non-empty search clauses with the AND separator (comma). */
  private and(...parts: string[]): string {
    return parts.filter((p) => p && p.length).join(',');
  }

  load(): void {
    this.loading = true;
    this.spinner.show();
    const pd = this.dateClause('dateDepart'); // transport plans
    const od = this.dateClause('date'); // order transports

    forkJoin({
      pTotal: this.planService.sizeSearch(this.and(pd)),
      pActive: this.planService.sizeSearch(this.and('turnStatus.id!3;4', pd)),
      pDone: this.planService.sizeSearch(this.and('turnStatus.id:3', pd)),
      pCancel: this.planService.sizeSearch(this.and('turnStatus.id:4', pd)),
      oTotal: this.orderService.sizeSearch(this.and(od)),
      oCree: this.orderService.sizeSearch(this.and('turnStatus.id:1', od)),
      oValide: this.orderService.sizeSearch(this.and('turnStatus.id:2', od)),
      oFerme: this.orderService.sizeSearch(this.and('turnStatus.id:3', od)),
      oAnnule: this.orderService.sizeSearch(this.and('turnStatus.id:4', od)),
      oAller: this.orderService.sizeSearch(this.and('turnType.id:1', od)),
      oRetour: this.orderService.sizeSearch(this.and('turnType.id:2', od)),
      oAllerRetour: this.orderService.sizeSearch(this.and('turnType.id:3', od)),
    }).subscribe(
      (r: any) => {
        this.plansTotal = r.pTotal || 0;
        this.plansActive = r.pActive || 0;
        this.plansDone = r.pDone || 0;
        this.plansCanceled = r.pCancel || 0;
        this.ordersTotal = r.oTotal || 0;
        this.stCree = r.oCree || 0;
        this.stValide = r.oValide || 0;
        this.stFerme = r.oFerme || 0;
        this.stAnnule = r.oAnnule || 0;
        this.tpAller = r.oAller || 0;
        this.tpRetour = r.oRetour || 0;
        this.tpAllerRetour = r.oAllerRetour || 0;
        this.buildCharts();
        this.loading = false;
        this.spinner.hide();
      },
      () => {
        this.loading = false;
        this.spinner.hide();
      }
    );
  }

  reset(): void {
    this.dateSearch = null;
    this.load();
  }

  private buildCharts(): void {
    this.statusData = {
      labels: ['Créé', 'Validé', 'Fermé', 'Annulé', 'Autres'],
      datasets: [
        {
          data: [this.stCree, this.stValide, this.stFerme, this.stAnnule, this.ordersOther],
          backgroundColor: ['#2a78d6', '#eda100', '#1baf7a', '#e34948', '#b6bdc4'],
          hoverBackgroundColor: ['#3987e5', '#f2b733', '#3cc593', '#e66767', '#c8ced4'],
          borderColor: '#ffffff',
          borderWidth: 2,
        },
      ],
    };
    const total = this.ordersTotal;
    this.statusOptions = {
      cutoutPercentage: 62,
      legend: { position: 'right', labels: { usePointStyle: true, fontColor: '#52514e', padding: 16 } },
      tooltips: {
        callbacks: {
          label: (item: any, data: any) => {
            const v = data.datasets[0].data[item.index] || 0;
            const pct = total ? Math.round((v / total) * 100) : 0;
            return ` ${data.labels[item.index]}: ${v} (${pct}%)`;
          },
        },
      },
    };

    this.typeData = {
      labels: ['Aller', 'Retour', 'Aller-Retour'],
      datasets: [
        {
          label: 'Commandes',
          data: [this.tpAller, this.tpRetour, this.tpAllerRetour],
          backgroundColor: ['#2a78d6', '#4a3aa7', '#1baf7a'],
          borderRadius: 6,
        },
      ],
    };
    this.typeOptions = {
      legend: { display: false },
      scales: {
        yAxes: [{ ticks: { beginAtZero: true, precision: 0, fontColor: '#898781' }, gridLines: { color: '#e1e0d9' } }],
        xAxes: [{ ticks: { fontColor: '#52514e' }, gridLines: { display: false } }],
      },
    };
  }
}
