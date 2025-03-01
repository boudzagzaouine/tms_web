import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Md5 } from 'ts-md5';
import { AuthenticationService } from './authentication.service';
import { REST_URL, RESTGC_URL } from './../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class ProxyGCService {

  private readonly url = RESTGC_URL;
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
      console.log(fullurl);
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
      console.log(fullurl);
      return this.http.get<any[]>(fullurl);
  }

  findPagination(controller: string, search: string, page: number, size: number): Observable<any[]> {
      let httpparams = new HttpParams();
      httpparams = httpparams.append('search', search);
      httpparams = httpparams.append('page', page.toString());
      httpparams = httpparams.append('size', size.toString());
      httpparams = httpparams.append('token', this.getToken());
      const fullurl = this.url + controller + '/searchPage';
      console.log(fullurl);
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
      console.log(fullurl);
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
      console.log(fullurl);

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
      console.log(fullurl);

      return this.http.get<any[]>(fullurl);
  }

  findAvailable(controller: String): Observable<any[]>{
    const fullurl = this.url + controller + '/findAvailable?token=' + this.getToken();
    console.log(fullurl);
    return this.http.get<any[]>(fullurl);
  }

  set(controller: string, object: any): Observable<any> {
      const fullurl = this.url + controller + '/save?token=' + this.getToken();
      console.log(fullurl);
      console.log(object);

      return this.http.put(
          this.url + controller + '/save?token=' + this.getToken(),
          object
      );
  }

  add(controller: string, object: any): Observable<any> {
      const fullurl = this.url + controller + '/save?token=' + this.getToken();
      console.log(fullurl);
      return this.http.post(fullurl, object);
  }

  addForPos(controller: string, object: any): Observable<any> {
      const fullurl =
          this.url + controller + '/posSave?token=' + this.getToken();
      console.log(fullurl);
      return this.http.post(fullurl, object);
  }

  addAll(controller: string, object: any): Observable<any> {
      const fullurl =
          this.url + controller + '/saveALL?token=' + this.getToken();
      console.log(fullurl);
      return this.http.post(fullurl, object);
  }

  size(controller: string): Observable<number> {
      const fullurl = this.url + controller + '/size?token=' + this.getToken();
      console.log(fullurl);
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
      console.log(fullurl);
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
      console.log('delete id : ' + id);
      return this.http.delete<number>(fullurl);
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
      console.log(fullurl);
      return this.http.get<string>(fullurl);
  }
    getToken(): string {
    return this.authService.computeToken();
}
}
