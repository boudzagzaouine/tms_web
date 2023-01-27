import { Columns } from './../../models/column';
import { Filter } from './../../models/filter';
import { Key, element } from 'protractor';
import { Subject } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import * as jsPDF from 'jspdf';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  data: Array<any[]> = [];
  header: Array<any[]> = [];


  constructor() {

  }

  generateColumns(selectedColumns: any[], objectExportList: any[]) {
    this.data = [];
    selectedColumns = selectedColumns.map(col => ({
      title: col.header, dataKey: col.field, child: col.child, type: col.type
    }));
    console.log(objectExportList);


    objectExportList.forEach(e => {
      var tempObj = [];
      selectedColumns.forEach(c => {
        if (c.type === 'number' || c.type === 'string') {
          tempObj.push(e[c.dataKey]);
        } else if (c.type === 'date') {
          const d = new Date(e[c.dataKey]);

          tempObj.push(d.getDate() + '-' + (d.getUTCMonth() + 1) + '-' + d.getFullYear());
        } else if (c.type === 'boolean') {
          tempObj.push(e[c.dataKey] ? 'oui' : 'non');
        } else if(c.type === 'object'){

            if(e[c.dataKey]!=null){
              if(e[c.dataKey][c.child]!=null){
                tempObj.push(e[c.dataKey][c.child]);
              }

            }else{
              tempObj.push('');

            }

        }

      });
      //this.data = [];
      this.data.push(tempObj);
      this.header = selectedColumns.map(e => e.title);
    });

  }

  generatePdf(selectedColumns: any[], objectExportList: any[], className: string, titleList: string) {

    this.generateColumns(selectedColumns, objectExportList);

    import('jspdf').then(jsPDF => {
      import('jspdf-autotable').then(x => {
        const doc = new jsPDF.default(0, 0);
        doc.setFontSize(18);
        // doc.text(15, 15, titleList);
        doc.autoTable(selectedColumns, this.data);
        doc.save(`${className}.pdf`);
      });
    });





  }

  generateExcel(selectedColumns: any[], objectExportList: any[], className: string, titleClasse: string) {

    this.generateColumns(selectedColumns, objectExportList);


    // generate header
    //Excel Title, Header, Data
    const title = titleClasse;

    //Create workbook and worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(title);
    //Add Row and formatting
    let titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Times New Roman', family: 4, size: 16, bold: true, }
    worksheet.addRow([]);
    worksheet.mergeCells('A1:D2');
    //Blank Row
    worksheet.addRow([]);
    //Add Header Row
    let headerRow = worksheet.addRow(this.header);
    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '1DBBD9' },
        bgColor: { argb: '1DBBD9' },

      }
      headerRow.font = { name: 'Times New Roman', family: 4, size: 12, bold: true, }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    })
    // Add Data and Conditional Formatting
    this.data.forEach(d => {
      worksheet.addRow(d);
    }
    );

    //Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, `${className}.xlsx`);
    })
  }


}
