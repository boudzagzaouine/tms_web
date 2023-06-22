import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { REST_URL } from '../../utils';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TmsdashboardService {

  private readonly url = REST_URL;
  constructor(private http: HttpClient,
    private authService: AuthenticationService) { }

  getmileagevehicle(
    vehicleId: number,
    trajetId: number,
    categoryId: number,
    marqueId:any,
    senioritymode:any,
    dateDepart: string,
    dateFin: string
  ): Observable<any> {
   
    let url1 = this.url + 'tmsdashboard' + '/mileagevehicle?' + '&token=' + this.getToken();
    vehicleId != null? url1 = url1 + '&vehicleId=' + vehicleId:url1 = url1 + '&vehicleId=*';
    trajetId != null? url1 = url1 + '&trajetId=' + trajetId:url1 = url1 + '&trajetId=*';
    categoryId != null? url1 = url1 + '&categoryId=' + categoryId:url1 = url1 + '&categoryId=*';
    marqueId != null? url1 = url1 + '&marqueId=' + marqueId:url1 = url1 + '&marqueId=*';
    senioritymode != null? url1 = url1 + '&senioritymode=' + senioritymode:url1 = url1 + '&senioritymode=*';
    if (dateDepart != null) url1 = url1 + '&dateDepart=' + dateDepart;
    if (dateFin != null) url1 = url1 + '&dateFin=' + dateFin;
    console.log(url1);

    return this.http.get<any>(url1);
  }

  getrefusedtransport(
    transportId: number,
    dateDepart: string,
    dateFin: string
  ): Observable<any> {
      let url1 = this.url + 'tmsdashboard' + '/transportrefused?' + '&token=' + this.getToken();
      transportId != null? url1 = url1 + '&transportId=' + transportId:url1 = url1 + '&transportId=*';
      if (dateDepart != null) url1 = url1 + '&dateDepart=' + dateDepart;
      if (dateFin != null) url1 = url1 + '&dateFin=' + dateFin;
      console.log(url1);
  
      return this.http.get<any>(url1);
  }

  getrejectededtransport(
    transportId: number,
    dateDepart: string,
    dateFin: string
  ): Observable<any> {
      let url1 = this.url + 'tmsdashboard' + '/transportrejected?' + '&token=' + this.getToken();
      transportId != null? url1 = url1 + '&transportId=' + transportId:url1 = url1 + '&transportId=*'
      if (dateDepart != null) url1 = url1 + '&dateDepart=' + dateDepart;
      if (dateFin != null) url1 = url1 + '&dateFin=' + dateFin;
      console.log(url1);
  
      return this.http.get<any>(url1);
  }

  getvalidertransport(
    transportId: number,
    dateDepart: string,
    dateFin: string
  ): Observable<any> {
      let url1 = this.url + 'tmsdashboard' + '/transportvalider?' + '&token=' + this.getToken();
      transportId != null? url1 = url1 + '&transportId=' + transportId:url1 = url1 + '&transportId=*'      
      if (dateDepart != null) url1 = url1 + '&dateDepart=' + dateDepart;
      if (dateFin != null) url1 = url1 + '&dateFin=' + dateFin;
      console.log(url1);
  
      return this.http.get<any>(url1);
  }

  getcanceledtransport(
    transportId: number,
    dateDepart: string,
    dateFin: string
  ): Observable<any> {
    let url1 = this.url + 'tmsdashboard' + '/transportcanceled?' + '&token=' + this.getToken();
    transportId != null? url1 = url1 + '&transportId=' + transportId:url1 = url1 + '&transportId=*'    
    if (dateDepart != null) url1 = url1 + '&dateDepart=' + dateDepart;
    if (dateFin != null) url1 = url1 + '&dateFin=' + dateFin;
    console.log(url1);

    return this.http.get<any>(url1);
  }

  gettrajetaveragedurationdriver(
    driverId: number,
    trajetId: number,
    dateDepart: string,
    dateFin: string

  ): Observable<any> {
    let url1 = this.url + 'tmsdashboard' + '/durationtrajet?' + '&token=' + this.getToken();
    driverId != null? url1 = url1 + '&driverId=' + driverId:url1 = url1 + '&driverId=*';
    trajetId != null? url1 = url1 + '&trajetId=' + trajetId:url1 = url1 + '&trajetId=*';
    if(dateDepart != null) url1 = url1 + '&dateDepart=' + dateDepart;
    if(dateFin != null) url1 = url1 + '&dateFin=' + dateFin;
    console.log(url1);

    return this.http.get<any>(url1);
  }
  gettrajetaveragedurationvehicle(
    vehicleId: number,
    trajetId: number,
    categoryId: number,
    marqueId:any,
    senioritymode:any,
    dateDepart: string,
    dateFin: string

  ): Observable<any> {
    let url1 = this.url + 'tmsdashboard' + '/durationtrajetvehicle?' + '&token=' + this.getToken();
    vehicleId != null? url1 = url1 + '&vehicleId=' + vehicleId:url1 = url1 + '&vehicleId=*';
    trajetId != null? url1 = url1 + '&trajetId=' + trajetId:url1 = url1 + '&trajetId=*';
    categoryId != null? url1 = url1 + '&categoryId=' + categoryId:url1 = url1 + '&categoryId=*';
    marqueId != null? url1 = url1 + '&marqueId=' + marqueId:url1 = url1 + '&marqueId=*';
    senioritymode != null? url1 = url1 + '&senioritymode=' + senioritymode:url1 = url1 + '&senioritymode=*';
    if (dateDepart != null) url1 = url1 + '&dateDepart=' + dateDepart;
    if (dateFin != null) url1 = url1 + '&dateFin=' + dateFin;
    console.log(url1);

    return this.http.get<any>(url1);
  }
  gettrajetaveragedurationattentdriver(
    driverId: number,
    trajetId: number,
    dateDepart: string,
    dateFin: string

  ): Observable<any> {
    let url1 = this.url + 'tmsdashboard' + '/durationtrajetattent?' + '&token=' + this.getToken();
    driverId != null? url1 = url1 + '&driverId=' + driverId:url1 = url1 + '&driverId=*';
    trajetId != null? url1 = url1 + '&trajetId=' + trajetId:url1 = url1 + '&trajetId=*';
    if (dateDepart != null) url1 = url1 + '&dateDepart=' + dateDepart;
    if (dateFin != null) url1 = url1 + '&dateFin=' + dateFin;
    console.log(url1);

    return this.http.get<any>(url1);
  }
  
  gettrajetaveragedurationattentvehicle(
    vehicleId: any,
    trajetId: any,
    categoryId: any,
    marqueId:any,
    senioritymode:any,
    dateDepart: string,
    dateFin: string

  ): Observable<any> {
    let url1 = this.url + 'tmsdashboard' + '/durationtrajetattentvehicle?' + '&token=' + this.getToken();
    vehicleId != null? url1 = url1 + '&vehicleId=' + vehicleId:url1 = url1 + '&vehicleId=*';
    trajetId != null? url1 = url1 + '&trajetId=' + trajetId:url1 = url1 + '&trajetId=*';
    categoryId != null? url1 = url1 + '&categoryId=' + categoryId:url1 = url1 + '&categoryId=*';
    marqueId != null? url1 = url1 + '&marqueId=' + marqueId:url1 = url1 + '&marqueId=*';
    senioritymode != null? url1 = url1 + '&senioritymode=' + senioritymode:url1 = url1 + '&senioritymode=*';    
    if (dateDepart != null) url1 = url1 + '&dateDepart=' + dateDepart;
    if (dateFin != null) url1 = url1 + '&dateFin=' + dateFin;
    console.log(url1);
    return this.http.get<any>(url1);
  }

  
  gettrajetaveragedurationoperationdriver(
    driverId: number,
    trajetId: number,
    dateDepart: string,
    dateFin: string,

  ): Observable<any> {

    let url1 = this.url + 'tmsdashboard' + '/avgdurationoperationtrajet?' + '&token=' + this.getToken();
    driverId != null? url1 = url1 + '&driverId=' + driverId:url1 = url1 + '&driverId=*';
    trajetId != null? url1 = url1 + '&trajetId=' + trajetId:url1 = url1 + '&trajetId=*';
    if (dateDepart != null) url1 = url1 + '&dateDepart=' + dateDepart;
    if (dateFin != null) url1 = url1 + '&dateFin=' + dateFin;
    console.log(url1);

    return this.http.get<any>(url1);
  }
  gettrajetaveragedurationoperationvehicle(
    vehicleId: number,
    trajetId: number,
    categoryId: number,
    marqueId:any,
    senioritymode:any,
    dateDepart: string,
    dateFin: string,

  ): Observable<any> {

    let url1 = this.url + 'tmsdashboard' + '/avgdurationoperationtrajetvehicle?' + '&token=' + this.getToken();
    vehicleId != null? url1 = url1 + '&vehicleId=' + vehicleId:url1 = url1 + '&vehicleId=*';
    trajetId != null? url1 = url1 + '&trajetId=' + trajetId:url1 = url1 + '&trajetId=*';
    categoryId != null? url1 = url1 + '&categoryId=' + categoryId:url1 = url1 + '&categoryId=*';
    marqueId != null? url1 = url1 + '&marqueId=' + marqueId:url1 = url1 + '&marqueId=*';
    senioritymode != null? url1 = url1 + '&senioritymode=' + senioritymode:url1 = url1 + '&senioritymode=*';
    if (dateDepart != null) url1 = url1 + '&dateDepart=' + dateDepart;
    if (dateFin != null) url1 = url1 + '&dateFin=' + dateFin;
    console.log(url1);

    return this.http.get<any>(url1);
  }
  getmileagedriver(
    driverId: number,
    trajetId: number,
    dateDepart: string,
    dateFin: string
  ): Observable<any> {
    let url1 = this.url + 'tmsdashboard' + '/mileagedriver?' + '&token=' + this.getToken();
    driverId != null? url1 = url1 + '&driverId=' + driverId:url1 = url1 + '&driverId=*';
    trajetId != null? url1 = url1 + '&trajetId=' + trajetId:url1 = url1 + '&trajetId=*';
    if (dateDepart != null) url1 = url1 + '&dateDepart=' + dateDepart;
    if (dateFin != null) url1 = url1 + '&dateFin=' + dateFin;
    console.log(url1);

    return this.http.get<any>(url1);


  }

  getNumberTrajetsVehicle(
    vehicleId: number,
    trajetId: number,
    categoryId: number,
    marqueId:any,
    senioritymode:any,
    dateDepart: string,
    dateFin: string,
  ): Observable<any> {
      
    let url1 = this.url + 'tmsdashboard' + '/numbertrajetsvehicle?' + '&token=' + this.getToken();
    vehicleId != null? url1 = url1 + '&vehicleId=' + vehicleId:url1 = url1 + '&vehicleId=*';
    trajetId != null? url1 = url1 + '&trajetId=' + trajetId:url1 = url1 + '&trajetId=*';
    categoryId != null? url1 = url1 + '&categoryId=' + categoryId:url1 = url1 + '&categoryId=*';
    marqueId != null? url1 = url1 + '&marqueId=' + marqueId:url1 = url1 + '&marqueId=*';
    senioritymode != null? url1 = url1 + '&senioritymode=' + senioritymode:url1 = url1 + '&senioritymode=*';
    if (dateDepart != null) url1 = url1 + '&dateDepart=' + dateDepart;
    if (dateFin != null) url1 = url1 + '&dateFin=' + dateFin;
    console.log(url1);

    return this.http.get<any>(url1);
  }

  getNumberTrajetsDriver(
    driverId: number,
    trajetId: number,
    dateDepart: string,
    dateFin: string
  ): Observable<any> {

    let url1 = this.url + 'tmsdashboard' + '/numbertrajetsdriver?' + '&token=' + this.getToken();
    driverId != null? url1 = url1 + '&driverId=' + driverId:url1 = url1 + '&driverId=*';
    trajetId != null? url1 = url1 + '&trajetId=' + trajetId:url1 = url1 + '&trajetId=*';
    if (dateDepart != null) url1 = url1 + '&dateDepart=' + dateDepart;
    if (dateFin != null) url1 = url1 + '&dateFin=' + dateFin;
    console.log(url1);

    return this.http.get<any>(url1);
  }

  getToken(): string {
    return this.authService.computeToken();
  }





}
