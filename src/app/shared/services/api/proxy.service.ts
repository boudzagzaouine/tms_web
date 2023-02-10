import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Md5 } from 'ts-md5';
import { AuthenticationService } from './authentication.service';
import { REST_URL } from './../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class ProxyService {

  private readonly url = REST_URL;
  constructor(
      private http: HttpClient,
      private authService: AuthenticationService
  ) {
  }

  findAll(controller: string): Observable<any[]> {
      //  httpOptions.headers.append('token', this.getToken());
      const fullurl = this.url + controller + '/list?token=' + this.getToken();
      console.log(fullurl);
      return this.http.get<any[]>(fullurl);
  }

  findById(controller: string, id: number): Observable<any> {
      const fullurl =
          this.url + controller + '/' + id + '?token=' + this.getToken();
    //  console.log(fullurl);
      return this.http.get<any>(fullurl);

      //....users/2
  }

  getParents(controller: string): Observable<any> {
    const fullurl = this.url + controller + '/getParents?token=' + this.getToken();
    return this.http.get<any>(fullurl);
}

  findByCode(controller: string, code: string): Observable<any> {
      return this.http.get<any>(
          this.url +
          controller +
          '/findByCode?code=' +
          code +
          '&token=' +
          this.getToken()
      );
  }

  find(controller: string, search: string): Observable<any[]> {
      const fullurl =
          this.url +
          controller +
          '/search?search=' +
          search +
          '&token=' +
          this.getToken();
          //console.log("fullurl");

     // console.log(fullurl);
      return this.http.get<any[]>(fullurl);
  }

  findPagination(controller: string, search: string, page: number, size: number): Observable<any[]> {
      let httpparams = new HttpParams();
      httpparams = httpparams.append('search', search);
      httpparams = httpparams.append('page', page.toString());
      httpparams = httpparams.append('size', size.toString());
      httpparams = httpparams.append('token', this.getToken());
      const fullurl = this.url + controller + '/searchPage';
     // console.log(" find pagination");

     // console.log(fullurl);
      return this.http.get<any[]>(fullurl, { params: httpparams });
  }
  findPaginationAccounted(
      controller: string,
      search: string,
      page: number,
      size: number,
      accounted: number
  ): Observable<any[]> {
      const fullurl =
          this.url +
          controller +
          '/searchPage?search=' +
          search +
          '&page=' +
          page +
          '&size=' +
          size +
          '&token=' +
          this.getToken() +
          '&accounted=' + accounted;
     // console.log(fullurl);
      return this.http.get<any[]>(fullurl);
  }

  findAllPagination(
      controller: string,
      page: number,
      size: number
  ): Observable<any[]> {
      const fullurl =
          this.url +
          controller +
          '/listPage?page=' +
          page +
          '&size=' +
          size +
          '&token=' +
          this.getToken();
        //  console.log("pagination");

    //  console.log(fullurl);

      return this.http.get<any[]>(fullurl);
  }
  findAllPaginationAccounted(
      controller: string,
      page: number,
      size: number,
      accounted: number
  ): Observable<any[]> {
      const fullurl =
          this.url +
          controller +
          '/listPage?page=' +
          page +
          '&size=' +
          size +
          '&token=' +
          this.getToken() +
          '&accounted=' + accounted;
    //  console.log(fullurl);

      return this.http.get<any[]>(fullurl);
  }

  findAvailable(controller: String): Observable<any[]>{
    const fullurl = this.url + controller + '/findAvailable?token=' + this.getToken();
  //  console.log(fullurl);
    return this.http.get<any[]>(fullurl);
  }

  set(controller: string, object: any): Observable<any> {
      const fullurl = this.url + controller + '/save?token=' + this.getToken();
     // console.log(fullurl);
     // console.log(object);

      return this.http.put(
          this.url + controller + '/save?token=' + this.getToken(),
          object
      );
  }

  closeMaintenance(controller: string, object: any): Observable<any> {
    const fullurl = this.url + controller + '/close?token=' + this.getToken();
  //  console.log(fullurl);
  //  console.log(object);

    return this.http.put(
        this.url + controller + '/close?token=' + this.getToken(),
        object
    );
}




  add(controller: string, object: any): Observable<any> {
      const fullurl = this.url + controller + '/save?token=' + this.getToken();
    //  console.log(fullurl);
      return this.http.post(fullurl, object);
  }


  setAll(controller: string, object: any): Observable<any> {
    const fullurl = this.url + controller + '/saveALL?token=' + this.getToken();
  //  console.log(fullurl);
   // console.log(object);

    return this.http.put(
        this.url + controller + '/saveALL?token=' + this.getToken(),
        object
    );
}
  addAll(controller: string, object: any): Observable<any> {
      const fullurl =
          this.url + controller + '/saveALL?token=' + this.getToken();
   //   console.log(fullurl);
      return this.http.post(fullurl, object);
  }
 addForPos(controller: string, object: any): Observable<any> {
      const fullurl =
          this.url + controller + '/posSave?token=' + this.getToken();
    //  console.log(fullurl);
      return this.http.post(fullurl, object);
  }
  size(controller: string): Observable<number> {
      const fullurl = this.url + controller + '/size?token=' + this.getToken();
    //  console.log(fullurl);
      return this.http.get<number>(fullurl);
  }

  sizeSearch(controller: string, search: string): Observable<number> {
      const fullurl =
          this.url +
          controller +
          '/sizeSearch?search=' +
          search +
          '&token=' +
          this.getToken();
     // console.log(fullurl);
      return this.http.get<number>(fullurl);
  }

  delete(controller: string, id: number) {
      const fullurl =
          this.url +
          controller +
          '/delete/' +
          id +
          '?token=' +
          this.getToken();
     // console.log('delete id : ' + id);
      return this.http.delete<number>(fullurl);
  }

  deleteAllByIds(controller: string, ids: number[]) {
    const fullurl = this.url + controller + '/deleteAll?ids=' + ids.join(',') + '&token=' + this.getToken();
   // console.log('delete list : ' + ids.join(','));
    return this.http.delete(fullurl);
}


  login(controller: string, code: string, password: string) {
      password = Md5.hashStr(password).toString();
      return this.http.get(
          this.url +
          controller +
          '/login?code=' +
          code +
          '&password=' +
          password
      );
  }

  generateCode(controller: string) {
      const fullurl =
          this.url + controller + '/nextval?token=' + this.getToken();
     // console.log(fullurl);
      return this.http.get<string>(fullurl,{responseType : 'text' as 'json'});
  }
    getToken(): string {
    return this.authService.computeToken();
}

findByPatrimony(controller: string, idVehicle: number): Observable<any> {
  const fullurl =
      this.url + controller + '/getVehicle/' + idVehicle + '?token=' + this.getToken();
 // console.log(fullurl);
  return this.http.get<any>(fullurl);
}

verify(controller: string) {
    const fullurl =
        this.url +
        controller +
        '?token=' +
        this.getToken();
    return this.http.get(fullurl);
}



generateSupplierInvoiceFromReception(controller: string, object: any): Observable<any> {
  const fullurl = this.url + controller + '/generateSupplierInvoiceFromReceptions?token=' + this.getToken();
  return this.http.post(
      this.url + controller + '/generateSupplierInvoiceFromReceptions?token=' + this.getToken(),
      object
  );
}


getLastPriceTransportPlan(controller: string, search: string): Observable<any> {
  const fullurl =
      this.url +
      controller +
      '/getLastPriceTransport?search=' +
      search +
      '&token=' +
      this.getToken();
      //console.log("fullurl");

 // console.log(fullurl);
  return this.http.get<any>(fullurl);
}

getLastPriceTransportPlans(controller: string, search: string): Observable<any[]> {
  const fullurl =
      this.url +
      controller +
      '/getLastPriceTransports?search=' +
      search +
      '&token=' +
      this.getToken();
      //console.log("fullurl");

 // console.log(fullurl);
  return this.http.get<any[]>(fullurl);
}








//importing
addDataExchangeAddressDelivery(controller: string, object: any): Observable<any> {
  const fullurl =
      this.url + controller + '/saveAddressDeliverys?token=' + this.getToken();
//   console.log(fullurl);
  return this.http.post(fullurl, object);
}

addDataExchangeCatalogPricing(controller: string, object: any): Observable<any> {
  const fullurl =
      this.url + controller + '/saveCatalogPricings?token=' + this.getToken();
//   console.log(fullurl);
  return this.http.post(fullurl, object);
}
addDataExchangeAccountPricing(controller: string, object: any): Observable<any> {
  const fullurl =
      this.url + controller + '/saveAccountPricings?token=' + this.getToken();
//   console.log(fullurl);
  return this.http.post(fullurl, object);
}
addDataExchangeTransportAccountPricing(controller: string, object: any): Observable<any> {
  const fullurl =
      this.url + controller + '/saveCatalogTransportAccountPricings?token=' + this.getToken();
//   console.log(fullurl);
  return this.http.post(fullurl, object);
}

addDataExchangeTransportPricing(controller: string, object: any): Observable<any> {
  const fullurl =
      this.url + controller + '/saveCatalogTransportPricings?token=' + this.getToken();
//   console.log(fullurl);
  return this.http.post(fullurl, object);
}

addDataExchangeTrajet(controller: string, object: any): Observable<any> {
  const fullurl =
      this.url + controller + '/saveTrajets?token=' + this.getToken();
//   console.log(fullurl);
  return this.http.post(fullurl, object);
}
}
