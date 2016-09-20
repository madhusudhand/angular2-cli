import { Injectable } from '@angular/core';
import {
  Http,
  Headers,
  RequestOptionsArgs,
  Response
} from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpClient {
  constructor(private http: Http) {
  }

  private attachAuthHeaders(options){
    options = options || {};
    let headers = options.headers || new Headers();
    headers.append('Authorization', 'Basic ' + btoa('username:password'));
    headers.append('Accept',        'application/json');
    headers.append('Content-Type',  'application/json');

    options.headers = headers;
    return options;
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.get(url, this.attachAuthHeaders(options));
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.post(url, body, this.attachAuthHeaders(options));
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.put(url, body, this.attachAuthHeaders(options));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.delete(url, this.attachAuthHeaders(options));
  }

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.patch(url, body, this.attachAuthHeaders(options));
  }

  head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.head(url, this.attachAuthHeaders(options));
  }
}
