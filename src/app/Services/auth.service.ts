import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL = `https://sislimoda.com/api/auth/`;
  token: any = `Hamada__` + localStorage.getItem("token");
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    this.token = `Hamada__` + localStorage.getItem("token")
  }


  signIn(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}LoginAdmin?userName=${data.email}&password=${data.password}`, {});
  }

  forgetEmail(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}ForgetPassword?userName=${data.email}`, {});
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
