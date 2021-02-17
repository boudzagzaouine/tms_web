import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { REST_URL } from '../../utils';
import { Observable } from 'rxjs';

@Injectable()
export class DashboardService  {

  private readonly url = REST_URL;
  constructor(
      private http: HttpClient,
      private authService: AuthenticationService
  ) {
  }

  getAverageConsumption(
      vehicleId: number,
      CategoryId: number,
      dateDepart: string,
      dateFin: string
  ): Observable<any> {
      const fullurl =
          this.url +
          'dashboard' +
          '/averageConsumption?vehicleId=' +
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


  getCorrectivemaintenancecostsbyvehicle(
    vehicleId: number,
    CategoryId: number,
    dateDepart: string,
    dateFin: string
): Observable<any> {
    const fullurl =
        this.url +
        'dashboard' +
        '/correctivemaintenancecostsbyvehicle?vehicleId=' +
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


getPreventivemaintenancecostsbyvehicle(
    vehicleId: number,
    CategoryId: number,
    dateDepart: string,
    dateFin: string
): Observable<any> {
    const fullurl =
        this.url +
        'dashboard' +
        '/preventivemaintenancecostsbyvehicle?vehicleId=' +
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


getTraveledmileagebyvechile(
    vehicleId: number,
    CategoryId: number,
    dateDepart: string,
    dateFin: string
): Observable<any> {
    const fullurl =
        this.url +
        'dashboard' +
        '/traveledmileagebyvechile?vehicleId=' +
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


getTotalnumberofproblemsbyvehicle(
    vehicleId: number,
    CategoryId: number,
    dateDepart: string,
    dateFin: string
): Observable<any> {
    const fullurl =
        this.url +
        'dashboard' +
        '/totalnumberofproblemsbyvehicle?vehicleId=' +
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

// driver


getAverageConsumptionDriver(
    driverId: number,
    dateDepart: string,
    dateFin: string
): Observable<any> {
    const fullurl =
        this.url +
        'dashboard' +
        '/averageConsumptiondriver?driverId=' +
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


getCorrectivemaintenancecostsbyDriver(
    driverId: number,
  dateDepart: string,
  dateFin: string
): Observable<any> {
  const fullurl =
      this.url +
      'dashboard' +
      '/correctivemaintenancecostsbydriver?driverId=' +
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


getPreventivemaintenancecostsbyDriver(
    driverId: number,
  dateDepart: string,
  dateFin: string
): Observable<any> {
  const fullurl =
      this.url +
      'dashboard' +
      '/preventivemaintenancecostsbydriver?driverId=' +
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


getTraveledmileagebyDriver(
    driverId: number,
  dateDepart: string,
  dateFin: string
): Observable<any> {
  const fullurl =
      this.url +
      'dashboard' +
      '/traveledmileagebydriver?driverId=' +
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


getTotalnumberofproblemsbyDriver(
    driverId: number,
  dateDepart: string,
  dateFin: string
): Observable<any> {
  const fullurl =
      this.url +
      'dashboard' +
      '/totalnumberofproblemsbydriver?driverId=' +
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




//seniority

getAverageConsumptionseniorityvehicle(
    categoryid: number,
    slice1: number,
    slice2: number,
    senioritymode: number
): Observable<any> {
    const fullurl =
        this.url +
        'dashboard' +
        '/averageConsumptionseniorityvehicle?categoryid=' +
        categoryid +
        '&slice1=' +
        slice1 +
        '&slice2=' +
        slice2 +
        '&senioritymode=' +
        senioritymode +
        '&token=' +
        this.getToken();
        
    console.log(fullurl);
    return this.http.get<any>(fullurl);
}


getCorrectivemaintenancecostsbyseniorityvehicle(
    categoryid: number,
    slice1: number,
    slice2: number,
    senioritymode: number
): Observable<any> {
  const fullurl =
      this.url +
      'dashboard' +
      '/correctivemaintenancecostsbyseniorityvehicle?categoryid=' +
      categoryid +
      '&slice1=' +
      slice1 +
      '&slice2=' +
      slice2 +
      '&senioritymode=' +
      senioritymode +
      '&token=' +
      this.getToken();
      
  console.log(fullurl);
  return this.http.get<any>(fullurl);
}


getPreventivemaintenancecostsbyseniorityvehicle(
    categoryid: number,
    slice1: number,
    slice2: number,
    senioritymode: number
): Observable<any> {
  const fullurl =
      this.url +
      'dashboard' +
      '/preventivemaintenancecostsbyseniorityvehicle?categoryid=' +
      categoryid +
      '&slice1=' +
      slice1 +
      '&slice2=' +
      slice2 +
      '&senioritymode=' +
      senioritymode +
      '&token=' +
      this.getToken();
      
  console.log(fullurl);
  return this.http.get<any>(fullurl);
}


getTraveledmileagebyseniorityvehicle(
    categoryid: number,
    slice1: number,
    slice2: number,
    senioritymode: number
): Observable<any> {
  const fullurl =
      this.url +
      'dashboard' +
      '/traveledmileagebyseniorityvehicle?categoryid=' +
      categoryid +
      '&slice1=' +
      slice1 +
      '&slice2=' +
      slice2 +
      '&senioritymode=' +
      senioritymode +
      '&token=' +
      this.getToken();
      
  console.log(fullurl);
  return this.http.get<any>(fullurl);
}


getTotalnumberofproblemsbyseniorityvehicle(
    categoryid: number,
    slice1: number,
    slice2: number,
    senioritymode: number
): Observable<any> {
  const fullurl =
      this.url +
      'dashboard' +
      '/totalnumberofproblemsbyseniorityvehicle?categoryid=' +
      categoryid +
      '&slice1=' +
      slice1 +
      '&slice2=' +
      slice2 +
      '&senioritymode=' +
      senioritymode +
      '&token=' +
      this.getToken();
      
  console.log(fullurl);
  return this.http.get<any>(fullurl);
}










  getToken(): string {
    return this.authService.computeToken();
}
}