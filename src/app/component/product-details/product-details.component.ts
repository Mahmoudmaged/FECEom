import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/Services/order.service';
import { ProductService } from 'src/app/Services/product.service';
declare let $: any;
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: any;
  pages: number = 20;
  pageSize = 8
  currentPage = 1
  photo: string = `../../../assets/images/avatar/ava.png`
  userInfo: any;
  constructor(private _Router: Router, private _ProductService: ProductService, public _ActivatedRoute: ActivatedRoute) {
    this.userInfo = JSON.parse(localStorage.getItem('user')!);

    this.photo = this.userInfo?.photo || this.photo;
    this.getProduct(this._ActivatedRoute.snapshot.paramMap.get('id')!)

  }



  ngOnInit(): void {
  }

  getProduct(orderId: any) {
    return this._ProductService.getProductById(orderId).subscribe(res => {
      console.log({ res });
      this.product = res
    }, err => {
      console.log({ err });
    }
    )
  }

  
  closeProductDetailsSec() {
    this._Router.navigateByUrl(`admin/product`)

  }
}
