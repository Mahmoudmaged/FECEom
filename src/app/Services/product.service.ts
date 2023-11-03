import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseURL = `https://sislimoda.com/api/Product/`;
  token: any = localStorage.getItem("token");
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    this.token = localStorage.getItem("token")
  }


  getProductWithId(id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetById?Id=${id}`)
  }
  getProductsList(): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetAll`);

  }
  getProductsListByVendor(id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetAllByVendor?VendorId=${id}`);

  }
  getProductById(id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetById?Id=${id}`);

  }

  addProduct(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}Add`, data);

  }

  updateProduct(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}Update`, data);

  }
}
