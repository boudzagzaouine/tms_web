import { NgxSpinnerService } from 'ngx-spinner';
import { ExportService } from './../../../shared/services/api/export.service';
import { ImportClass } from './../../../shared/import/imort-class';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-export-canevas',
  templateUrl: './export-canevas.component.html',
  styleUrls: ['./export-canevas.component.scss']
})
export class ExportCanevasComponent implements OnInit {
  models: ImportClass[] = [];
  model: string ;
  constructor(private exportService :ExportService,
    private spinner: NgxSpinnerService,
    ) { }

  ngOnInit() {

    let deliveryAddress: ImportClass = new ImportClass(
      1,
      "Adresse-livraison.xlsx"
    );
    let catalogPricing: ImportClass = new ImportClass(2, "Tarifs.xlsx");
    let accountPricing: ImportClass = new ImportClass(3, "Tarifs-Client-Vente.xlsx");
    let transportPricing: ImportClass = new ImportClass(3, "Tarifs-Transporteur-Achat.xlsx");
    let transportAccountPricing: ImportClass = new ImportClass(3, "Tarifs-Transporteur-Client-Achat.xlsx");
    let trajet: ImportClass = new ImportClass(3, "Trajet.xlsx");
    let company: ImportClass = new ImportClass(7, "Company.xlsx");

    this.models.push(...[company,deliveryAddress, catalogPricing,accountPricing,transportAccountPricing,transportPricing,trajet]);
  }
  onClassImport(event) {
    console.log("Class");
    console.log(event);
    this.model=event.value;
    //this.idClass = event.value;
  //  console.log(this.idClass);
  }

  onSelectFile(event) {
  // this.onFileChange(event);
  }

  downloadFile(filename: string): void {
    this.spinner.show();

    this.exportService.exportCanevas(this.model).subscribe(data => {
      var file = new Blob([data as BlobPart], { type: "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64" });
      var fileURL = URL.createObjectURL(file);
      var a = document.createElement("a");
      a.href = fileURL;
      a.download = this.model;
      document.body.appendChild(a);
      a.click();
      this.spinner.hide();
    });
  }
}
