import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {
  Http,
  Headers,
  RequestOptions
} from '@angular/http';

import { AuthData } from './auth-data';
import { environment } from '../../../environments';
// import { HttpClient } from '../../common/httpclient';

@Injectable()
export class AuthService {

  private url: string = environment.service.api + '/auth';

  constructor(private http: Http) {}

  public login (username, password): Observable<AuthData> {
    let body = JSON.stringify({ username, password });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url, body, options)
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
