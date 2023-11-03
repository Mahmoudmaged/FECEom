import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseURL = `https://sislimoda.com/api/Category/`;
  token: any = `Hamada__` + localStorage.getItem("token");
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    this.token = `Hamada__` + localStorage.getItem("token")
  }


  categoryList(): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetAllMainCategory`);
  }

}
