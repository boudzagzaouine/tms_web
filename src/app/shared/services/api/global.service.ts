import { Columns } from './../../models/column';
import { Filter } from './../../models/filter';
import { Key, element } from 'protractor';
import { Subject } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import * as jsPDF from 'jspdf';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {


  constructor() {

  }


  exportPdf(selectedColumns: any[], objectExportList: any[], className: string) {
    var rows = [];

    selectedColumns = selectedColumns.map(col => ({
      title: col.header, dataKey: col.field, child: col.child, type: col.type


    }));
    console.log(objectExportList);

    var prepare = [];
    objectExportList.forEach(e => {
      var tempObj = [];
      selectedColumns.forEach(c => {
        if (c.type === 'object') {
          tempObj.push(e[c.dataKey][c.child]);
        } else if (c.type === 'number' || c.type === 'string') {
          tempObj.push(e[c.dataKey] );
        } else if (c.type === 'date') {
          const d = new Date(e[c.dataKey]);

          tempObj.push(d.getDate() + '-' + (d.getUTCMonth() + 1) + '-' + d.getFullYear());
        } else if (c.type === 'boolean') {
          tempObj.push(e[c.dataKey] ? 'oui' : 'non');
        }

      });
      prepare.push(tempObj);
    });


    // import('jspdf').then(jsPDF => {
    //   import('jspdf-autotable').then(x => {
    //     const doc = new jsPDF.default(0, 0);
    //     doc.setFontSize(18);
    //     var splitTitle = doc.splitTextToSize("Liste /n", 180);
    //     doc.text(15, 15, splitTitle);
    //     doc.autoTable(selectedColumns, prepare);


    //     doc.save(`${className}.pdf`);
    //   });
    // });

      //prepare[0]=selectedColumns.map(e=>e.title);

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
