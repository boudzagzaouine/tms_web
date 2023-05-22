import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { REST_URL } from '../../utils';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TmsDashboardService {

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
    transportId: number
  ): Observable<any> {
    const fullurl =
      this.url +
      'Tmsdashboard' + '/transportrefused?transportId=' +
      transportId +
      '&token=' +
      this.getToken();
    console.log(fullurl);
    return this.http.get<any>(fullurl);
  }

  getrejectededtransport(
    transportId: number
  ): Observable<any> {
    const fullurl =
      this.url +
      'Tmsdashboard' + '/transportrejected?transportId=' +
      transportId +
      '&token=' +
      this.getToken();
    console.log(fullurl);
    return this.http.get<any>(fullurl);
  }

  getvalidertransport(
    transportId: number
  ): Observable<any> {
    const fullurl =
      this.url +
      'Tmsdashboard' + '/transportvalider?transportId=' +
      transportId +
      '&token=' +
      this.getToken();
    console.log(fullurl);
    return this.http.get<any>(fullurl);
  }

  getcanceledtransport(
    transportId: number
  ): Observable<any> {
    const fullurl =
      this.url +
      'Tmsdashboard' + '/transportcanceled?transportId=' +
      transportId +
      '&token=' +
      this.getToken();
    console.log(fullurl);
    return this.http.get<any>(fullurl);
  }
  getmileagedriver(
    vehicleId: number,
    dateDepart: string,
    dateFin: string
  ): Observable<any> {
    const fullurl =
      this.url +
      'Tmsdashboard' + '/mileagevdriver?driverId=' +
      vehicleId +
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
    console.log(fullurl);
    return this.http.get<any>(fullurl);
  }

  getNumberTrajetsDriver(
    driverId: number,
    dateDepart: string,
    dateFin: string
  ): Observable<any> {
    const fullurl =
      this.url +
      'Tmsdashboard' + '/numbertrajetsdriver?driverId=' +
      driverId +
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
