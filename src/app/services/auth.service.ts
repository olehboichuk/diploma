import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AUTH_API, environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ILoginModel, ILoginResponseModel, IRegisterModel} from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public login(body: ILoginModel): Observable<ILoginResponseModel> {
    return this.http.post<ILoginResponseModel>(environment.apiUrl + AUTH_API.login, body);
  }

  public logout(): Observable<any> {
    return this.http.get(environment.apiUrl + AUTH_API.logout);
  }

  public register(body: IRegisterModel): Observable<any> {
    return this.http.post(environment.apiUrl + AUTH_API.register, body);
  }

}
