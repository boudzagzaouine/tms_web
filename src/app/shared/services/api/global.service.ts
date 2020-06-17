import { Filter } from './../../models/filter';
import { Key, element } from 'protractor';
import { Subject } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  rows: Array<any>[];
  constructor() {

  }


  exportPdf(selectedColumns: any[], objectExportList: any[], className: string) {
    var rows = [];

    selectedColumns = selectedColumns.map(col => ({
      title: col.header, dataKey: col.field,


    }));


    selectedColumns.forEach(elementt => console.log(elementt.field)
    );

    // tslint:disable-next-line: forin
    for (let key in objectExportList) {
      let temp = [key, objectExportList[key]];
      rows.push(temp);
    }

    console.log("rows is ");
    console.log(rows);


    // import('jspdf').then(jsPDF => {
    //   import('jspdf-autotable').then(x => {
    //     const doc = new jsPDF.default(0, 0);
    //     doc.autoTable(selectedColumns, objectExportList);
    //     console.log(doc);

    //     doc.save(`${className}.pdf`);
    //   });
    // });
  }

  exportExcelGlobal(data: any[], fileName: string) {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, fileName);
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }


}
