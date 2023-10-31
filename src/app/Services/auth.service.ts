import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL = `http://localhost:3000/api/v1/auth/`;
  token: any = `Hamada__` + localStorage.getItem("token");
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    this.token = `Hamada__` + localStorage.getItem("token")
  }


  signIn(data: any): Observable<any> {
    console.log({ data });
    return this._HttpClient.post(this.baseURL + "login", data);
  }
}
