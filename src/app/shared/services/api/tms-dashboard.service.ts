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
    CategoryId: number,
    dateDepart: string,
    dateFin: string
  ): Observable<any> {
    const fullurl =
      this.url +
      'Tmsdashboard' + '/mileagevehicle?vehicleId=' +
      vehicleId +
      '&categoryId=' +
      CategoryId +
      '&dateDepart=' +
      dateDepart +
      '&dateFin=' +
      dateFin +
      '&token=' +
      this.getToken();
    console.log(fullurl);
    return this.http.get<any>(fullurl);
  }

  getrefusedtransport(
    transportId: number,
    dateDepart: string,
    dateFin: string
  ): Observable<any> {
    const fullurl =
      this.url +
      'Tmsdashboard' + '/transportrefused?transportId=' +
      transportId +
      '&dateDepart=' +
      dateDepart +
      '&dateFin=' +
      dateFin +
      '&token=' +
      this.getToken();
    return this.http.get<any>(fullurl);
  }

  getrejectededtransport(
    transportId: number,
    dateDepart: string,
    dateFin: string
  ): Observable<any> {
    const fullurl =
      this.url +
      'Tmsdashboard' + '/transportrejected?transportId=' +
      transportId +
      '&dateDepart=' +
      dateDepart +
      '&dateFin=' +
      dateFin +
      '&token=' +
      this.getToken();
    return this.http.get<any>(fullurl);
  }

  getvalidertransport(
    transportId: number,
    dateDepart: string,
    dateFin: string
  ): Observable<any> {
    const fullurl =
      this.url +
      'Tmsdashboard' + '/transportvalider?transportId=' +
      transportId +
      '&dateDepart=' +
      dateDepart +
      '&dateFin=' +
      dateFin +
      '&token=' +
      this.getToken();
    return this.http.get<any>(fullurl);
  }

  getcanceledtransport(
    transportId: number,
    dateDepart: string,
    dateFin: string
  ): Observable<any> {
    const fullurl =
      this.url +
      'Tmsdashboard' + '/transportcanceled?transportId=' +
      transportId +
      '&dateDepart=' +
      dateDepart +
      '&dateFin=' +
      dateFin +
      '&token=' +
      this.getToken();
    return this.http.get<any>(fullurl);
  }
  getplantransportaverageduration(
    driverId: number,
    ordertypeId: number

  ): Observable<any> {
    const fullurl =
      this.url +
      'Tmsdashboard' + '/plantransportaverageduration?driverId=' +
      driverId +
      '&ordertypeId='
      + ordertypeId +
      '&token=' +
      this.getToken();
    console.log(fullurl);

    return this.http.get<any>(fullurl);
  }
  gettrajetaverageduration(
    driverId: number,
    operationId: number,
    trajetId: number,
    dateDepart: string,
    dateFin: string

  ): Observable<any> {
    const fullurl =
      this.url +
      'Tmsdashboard' + '/durationtrajet?driverId=' +
      driverId +
      '&operationId=' +
      operationId +
      '&trajetId='
      + trajetId +
      '&dateDepart=' +
      dateDepart +
      '&dateFin=' +
      dateFin +
      '&token=' +
      this.getToken();
    console.log(fullurl);

    return this.http.get<any>(fullurl);
  }
  gettrajetaveragedurationattent(
    driverId: number,
    operationId: number,
    trajetId: number,
    dateDepart: string,
    dateFin: string

  ): Observable<any> {
    const fullurl =
      this.url +
      'Tmsdashboard' + '/durationtrajetattent?driverId=' +
      driverId +
      '&operationId=' +
      operationId +
      '&trajetId='
      + trajetId +
      '&dateDepart=' +
      dateDepart +
      '&dateFin=' +
      dateFin +
      '&token=' +
      this.getToken();
    console.log(fullurl);

    return this.http.get<any>(fullurl);
  }
  gettrajetaveragedurationoperation(
    driverId: number,
    operationId: number,
    trajetId: number,
    dateDepart: string,
    dateFin: string,

  ): Observable<any> {
    const fullurl =
      this.url +
      'Tmsdashboard' + '/avgdurationoperationtrajet?driverId=' +
      driverId +
      '&operationId=' +
      operationId +
      '&trajetId=' +
      + trajetId +
      '&dateDepart=' +
      dateDepart +
      '&dateFin=' +
      dateFin +
      '&token=' +
      this.getToken();
    console.log(fullurl);

    return this.http.get<any>(fullurl);
  }
  getmileagedriver(
    driverId: number,
    trajetId: number,
    dateDepart: string,
    dateFin: string
  ): Observable<any> {

    const fullurl =
      this.url +
      'Tmsdashboard' + '/mileagedriver?driverId=' +
      driverId +
      '&trajetId=' +
      + trajetId +
      '&dateDepart=' +
      dateDepart +
      '&dateFin=' +
      dateFin +
      '&token=' +
      this.getToken();
    console.log(fullurl);

    return this.http.get<any>(fullurl);


  }

  getNumberTrajetsVehicle(
    vehicleId: number,
    CategoryId: number,
    dateDepart: string,
    dateFin: string
  ): Observable<any> {
    const fullurl =
      this.url +
      'Tmsdashboard' + '/numbertrajetsvehicle?vehicleId=' +
      vehicleId +
      '&categoryId=' +
      CategoryId +
      '&dateDepart=' +
      dateDepart +
      '&dateFin=' +
      dateFin +
      '&token=' +
      this.getToken();
    return this.http.get<any>(fullurl);
  }

  getNumberTrajetsDriver(
    driverId: number,
    trajetId: number,
    dateDepart: string,
    dateFin: string
  ): Observable<any> {

    const fullurl =
    this.url +
    'Tmsdashboard' + '/numbertrajetsdriver?driverId=' +
    driverId +
    '&trajetId=' +
    + trajetId +
    '&dateDepart=' +
    dateDepart +
    '&dateFin=' +
    dateFin +
    '&token=' +
    this.getToken();
  console.log(fullurl);

  return this.http.get<any>(fullurl);
  }

  getToken(): string {
    return this.authService.computeToken();
  }





}
