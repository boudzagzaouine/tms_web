import { Subject } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {


  constructor() {

  }


  exportPdf(selectedColumns : any[] ,objectExportList : any[],className : string) {
    selectedColumns = selectedColumns.map(col => ({ title: col.header, dataKey: col.field }));
    import('jspdf').then(jsPDF => {
      import('jspdf-autotable').then(x => {
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(selectedColumns, objectExportList);
        console.log(doc);

       doc.save(`${className}.pdf`);
      });
    });
  }

  exportExcelGlobal(objects: any[], className: string) {
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(objects);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, `${className}.pdf`);
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
