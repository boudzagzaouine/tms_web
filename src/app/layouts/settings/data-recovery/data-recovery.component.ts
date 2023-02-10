import { TrajetImportService } from './../../../shared/services/api/trajet-import.service';
import { CatalogTransportPricingImportService } from './../../../shared/services/api/catalog-Transport-pricing-import.service';
import { CatalogTransportAccountPricingImportService } from './../../../shared/services/api/catalog-Transport-account-pricing-import.service';
import { AccountPricingImportService } from './../../../shared/services/api/account-pricing-import.service';
import { CatalogPricingImportService } from './../../../shared/services/api/catalog-pricing-import.service';
import { CatalogPricingService } from '../../../shared/services/api/catalog-pricing.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { AddressDeliveryService } from "./../../../shared/services/api/AddressDeliveryService.service";
import { ImportClass } from "./../../../shared/import/imort-class";
import { Component, OnInit } from "@angular/core";
import * as XLSX from "xlsx";

@Component({
  selector: "app-data-recovery",
  templateUrl: "./data-recovery.component.html",
  styleUrls: ["./data-recovery.component.scss"],
})
export class DataRecoveryComponent implements OnInit {
  models: ImportClass[] = [];
  model: ImportClass ;
  dataString: string;
  idClass: number = 0;
  jsonData: any[] = [];
  constructor(
    private addressDeliveryService: AddressDeliveryService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private catalogPricingImportationService :CatalogPricingImportService,
    private accountPricingImportationService :AccountPricingImportService,
    private catalogTransportAccountPricingImportService :CatalogTransportAccountPricingImportService,
    private catalogTransportPricingImportService :CatalogTransportPricingImportService,
    private trajetImportService: TrajetImportService

    ) {}

  ngOnInit() {
    let deliveryAddress: ImportClass = new ImportClass(
      1,
      "Adresse de livraison"
    );
    let catalogPricing: ImportClass = new ImportClass(2, "Tarification");
    let accountPricing: ImportClass = new ImportClass(3, "Tarification Client");
    let transportAccountPricing: ImportClass = new ImportClass(4, "Tarification Transport Client");
    let transportPricing: ImportClass = new ImportClass(5, "Tarification Transport");
    let trajet: ImportClass = new ImportClass(6, "Trajet");

    this.models.push(...[deliveryAddress, catalogPricing,accountPricing,transportAccountPricing,transportPricing,trajet]);
  }

  onClassImport(event) {
    console.log("Class");
    this.idClass = event.value;
    console.log(this.idClass);
  }

  onSubmit() {
    console.log("valider ");

    if (this.idClass == 1) {
      this.loadDeliveryAddress(this.jsonData);
    }
    if (this.idClass == 2) {
      this.loadCatalogPricing(this.jsonData);
    }  if (this.idClass == 3) {
      this.loadAccountPricing(this.jsonData);
    }  if (this.idClass == 4) {
      this.loadTransportAccountPricing(this.jsonData);
    }  if (this.idClass == 5) {
      this.loadTransportPricing(this.jsonData);
    } if (this.idClass == 6) {
      this.loadTrajet(this.jsonData);
    }
    else {
      this.toastr.info("Sélectionner une classe");
    }
  }
  // selectFile(event){
  //   this.onFileChange(event.files);
  // }

  onFileChange(ev) {
    this.spinner.show();
    this.jsonData = null;
    let workBook = null;
    // let jsonData = null;
    const reader = new FileReader();
    // const file = ev.target.files[0]; // for input fil html
    const file = ev.files[0]; // for input fil prim ng

    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: "binary" });
      this.jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      //  this.dataString = JSON.stringify(jsonData);
      console.log(this.jsonData);
      this.spinner.hide();
    };
    reader.readAsBinaryString(file);
  }

  onSelectFile(event) {
    this.onFileChange(event);
  }

  loadDeliveryAddress(jsonData) {
    console.log(jsonData);

    if (jsonData[0] == null) {
      this.toastr.info("Sélectionner Fichier");
    } else {
      this.spinner.show();
      this.addressDeliveryService
        .addDataExchangeAddressDelivery(jsonData)
        .subscribe(
          (data) => {
            console.log(data);
            this.toastr.success(
              "l'opération a ete effectue avec succès",
              "Edition"
            );

            this.spinner.hide();
          },
          (err) => {
            this.toastr.error(err.error.message, "Erreur");
            //this.toastr.error(err.error.message);
            this.spinner.hide();
          }
        );
    }
  }


  loadCatalogPricing(jsonData){
    console.log(jsonData);

  if(jsonData[0]==null){
    this.toastr.info("Sélectionner Fichier");

  }else{

    this.spinner.show();
    this.catalogPricingImportationService.addDataExchangeCatalogPricing(jsonData).subscribe(
      data =>{
    console.log(data);
    this.toastr.success("l'opération a ete effectue avec succès", 'Edition');

    this.spinner.hide();


      },
       err => {
        this.toastr.error(err.error.message,"Erreur");
        //this.toastr.error(err.error.message);
        this.spinner.hide();

      });
    }
  }

  loadAccountPricing(jsonData){
    console.log(jsonData);

  if(jsonData[0]==null){
    this.toastr.info("Sélectionner Fichier");

  }else{

    this.spinner.show();
    this.accountPricingImportationService.addDataExchangeAccountPricing(jsonData).subscribe(
      data =>{
    console.log(data);
    this.toastr.success("l'opération a ete effectue avec succès", 'Edition');

    this.spinner.hide();


      },
       err => {
        this.toastr.error(err.error.message,"Erreur");
        //this.toastr.error(err.error.message);
        this.spinner.hide();

      });
    }
  }

  loadTransportAccountPricing(jsonData){
    console.log(jsonData);

  if(jsonData[0]==null){
    this.toastr.info("Sélectionner Fichier");

  }else{

    this.spinner.show();
    this.catalogTransportAccountPricingImportService.addDataExchangeTransportAccountPricing(jsonData).subscribe(
      data =>{
    console.log(data);
    this.toastr.success("l'opération a ete effectue avec succès", 'Edition');

    this.spinner.hide();


      },
       err => {
        this.toastr.error(err.error.message,"Erreur");
        //this.toastr.error(err.error.message);
        this.spinner.hide();

      });
    }
  }


  loadTransportPricing(jsonData){
    console.log(jsonData);

  if(jsonData[0]==null){
    this.toastr.info("Sélectionner Fichier");

  }else{

    this.spinner.show();
    this.catalogTransportPricingImportService.addDataExchangeTransportPricing(jsonData).subscribe(
      data =>{
    console.log(data);
    this.toastr.success("l'opération a ete effectue avec succès", 'Edition');

    this.spinner.hide();


      },
       err => {
        this.toastr.error(err.error.message,"Erreur");
        //this.toastr.error(err.error.message);
        this.spinner.hide();

      });
    }
  }


  loadTrajet(jsonData){
    console.log(jsonData);

  if(jsonData[0]==null){
    this.toastr.info("Sélectionner Fichier");

  }else{

    this.spinner.show();
    this.trajetImportService.addDataExchangeTrajet(jsonData).subscribe(
      data =>{
    console.log(data);
    this.toastr.success("l'opération a ete effectue avec succès", 'Edition');

    this.spinner.hide();


      },
       err => {
        this.toastr.error(err.error.message,"Erreur");
        //this.toastr.error(err.error.message);
        this.spinner.hide();

      });
    }
  }

}
