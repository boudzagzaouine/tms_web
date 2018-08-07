import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { REST_URL } from '../../utils/constants';

@Injectable()
export class ProxyService {
    private url = REST_URL;
    private fullurl: string;
    private httpHeaders: HttpHeaders;
    constructor(private http: HttpClient,
                    private authService: AuthenticationService) {
                      this.httpHeaders = new HttpHeaders({
                                'token' : 'ems@ems.com',
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'Access-Control-Allow-Methods': '*',
                                'Access-Control-Allow-Origin': '*',
                                // tslint:disable-next-line:max-line-length
                                'Access-Control-Allow-Headers' : 'X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding'
                            });
                }

    findAll(controller: string): Observable<any[]> {
        // httpOptions.headers.append('token', this.getToken());
        this.fullurl = this.url + controller + '/list?token=' + this.getToken();
        console.log('getting All data');
        console.log( this.httpHeaders);
        console.log(this.fullurl);
        return this.http.get<any[]>(this.fullurl);
    }

    findById(controller: string, id: number): Observable<any> {
        this.fullurl = this.url + controller + '/' + id + '?token=' + this.getToken();
        console.log('headers  : ' + this.httpHeaders);
        console.log(this.fullurl);
        return this.http.get<any>(this.fullurl);
    }

    findByCode(controller: string, code: string): Observable<any> {
        return this.http.get<any>(this.url + controller + '/findByCode?code=' + code + '&token=' + this.getToken());
    }

    find(controller: string, search: string): Observable<any[]> {
        this.fullurl = this.url + controller + '/search?search=' + search + '&token=' + this.getToken();
        console.log(this.fullurl);

        return this.http.get<any[]>(this.fullurl);
    }

    findPagination(
        controller: string,
        search: string,
        page: number,
        size: number
    ): Observable<any[]> {
        this.fullurl = this.url +
        controller +
        '/searchPage?search=' +
        search +
        '&page=' +
        page +
        '&size=' +
        size + '&token=' + this.getToken();
        console.log(this.fullurl);
        return this.http.get<any[]>(
            this.fullurl
        );
    }

    findAllPagination(
        controller: string,
        page: number,
        size: number
    ): Observable<any[]> {
        this.fullurl = this.url + controller + '/listPage?page=' + page + '&size=' + size + '&token=' + this.getToken();
        console.log(this.fullurl);

        return this.http.get<any[]>(
            this.fullurl
        );
    }

    set(controller: string, object: any): Observable<any> {
        console.log('proxy - set' + object);
        return this.http.put(this.url + controller + '/save?token=' + this.getToken(), object);
    }

    add(controller: string, object: any): Observable<any> {
        console.log('proxy - add' + object);
        console.log('add url: ' + this.url + controller + '/save');
       return  this.http.post(this.url + controller + '/save?token=' + this.getToken(), object);
    }

    size(controller: string): Observable<number> {
        this.fullurl = this.url + controller + '/size?token=' + this.getToken();
        return this.http.get<number>(this.fullurl);
    }

    sizeSearch(controller: string, search: string): Observable<number> {
        this.fullurl = this.url + controller + '/sizeSearch?search=' + search + '&token=' + this.getToken();
        console.log(this.fullurl);
        return this.http.get<number>(
            this.fullurl
        );
    }

    delete(controller: string, id: number) {
        this.fullurl = this.url + controller + '/delete/' + id + '?token=' + this.getToken();
        console.log('delete id : ' +  id);
         return this.http.delete<number>(this.fullurl);
    }

    login(controller: string, code: string, password: string) {
        password = Md5.hashStr(password).toString();
        return this.http.get(
            this.url +
                controller +
                '/login?code=' +
                code + '&password=' +
                password
        );
    }

    generateCode(controller: string) {
      return this.http.get<string>(this.url + controller + '/nextval?token=' + this.getToken());
    }


    getToken(): string {
        return this.authService.computeToken();
    }
}
