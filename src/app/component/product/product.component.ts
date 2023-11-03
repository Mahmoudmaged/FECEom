import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrandService } from 'src/app/Services/brand.service';
import { CategoryService } from 'src/app/Services/category.service';
import { OrderService } from 'src/app/Services/order.service';
import { ProductService } from 'src/app/Services/product.service';
declare let $: any;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  fullProductList: any = []
  categoryList: any = []
  brandList: any = []
  productList: any = []
  pages: number = 5;
  pageSize: number = 3;
  currentPage: number = 1
  photo: string = `../../../assets/images/avatar/ava.png`
  userInfo: any;


  constructor(private _Router: Router,
    private _ProductService: ProductService,
    private _CategoryService: CategoryService,
    private _BrandService: BrandService) {
    this.userInfo = JSON.parse(localStorage.getItem('user')!);
    this.photo = this.userInfo?.photo || this.photo;
    this.getAllCategory()
    this.getAllBrands()
    this.getAllProducts()
  }



  ngOnInit(): void {
  }

  getAllCategory() {
    return this._CategoryService.categoryList().subscribe(res => {
      console.log({ res });
      this.categoryList = res;
    }, err => {
      console.log({ err });

    }
    )
  }
  getAllBrands() {
    return this._BrandService.brandList().subscribe(res => {
      console.log({ res });
      this.brandList = res;
    }, err => {
      console.log({ err });

    }
    )
  }
  getAllProducts() {

    if (this.userInfo.isUser) {
      "06eff051-2254-4eb7-d4fc-08dbbb387eb9"
      // this.userInfo.id
      return this._ProductService.getProductsListByVendor("06eff051-2254-4eb7-d4fc-08dbbb387eb9").subscribe(res => {
        console.log({ res });
        this.pages = Math.ceil(res.length / this.pageSize);//(`${res.length / this.pageSize}`);
        console.log(this.pages);

        this.fullProductList = res;
        this.productList = this.fullProductList.slice(0, this.pageSize);
      }, err => {
        console.log({ err });

      }
      )
    } else {
      return this._ProductService.getProductsList().subscribe(res => {
        console.log({ res });
        this.pages = Math.ceil(res.length / this.pageSize);
        this.fullProductList = res;
        this.productList = this.fullProductList.slice(0, this.pageSize);
      }, err => {
        console.log({ err });

      }
      )
    }

  }


  showDropDown(ind: number) {

    //remover from siblings
    $(`.dropdown-menu-list`).not(`.dropdown-menu-list${ind}`).slideUp(300)
    $('.search_dropdownMenuButton').not(`.search_dropdownMenuButton${ind}`).removeClass('search_dropdownMenuButton_click')
    //Display target dropdown
    $(`.dropdown-menu-list${ind}`).slideToggle(300)
    $(`.search_dropdownMenuButton${ind}`).toggleClass('search_dropdownMenuButton_click')
  }

  showDropDownFilter(classSelector: string, dropdownSelector: string) {
    //remover from siblings
    $(`.dropdown-menu-list`).not(`.${dropdownSelector}`).slideUp(300)
    $('.search_dropdownMenuButton').not(`.${classSelector}`).removeClass('search_dropdownMenuButton_click')
    //Display target dropdown
    $(`.${dropdownSelector}`).slideToggle(300)
    $(`.${classSelector}`).toggleClass('search_dropdownMenuButton_click')
  }

  changeCategoryStatusFilter(btn: string, status: string) {
    $(`.${btn}`).text(status)
    $(`.dropdown-menu-list`).slideUp(300)
    $('.search_dropdownMenuButton').removeClass('search_dropdownMenuButton_click')
  }

  changeBrandStatusFilter(btn: string, status: string) {
    $(`.${btn}`).text(status)
    $(`.dropdown-menu-list`).slideUp(300)
    $('.search_dropdownMenuButton').removeClass('search_dropdownMenuButton_click')
  }
  changeAvailabilityStatusFilter(btn: string, status: string) {
    $(`.${btn}`).text(status)
    $(`.dropdown-menu-list`).slideUp(300)
    $('.search_dropdownMenuButton').removeClass('search_dropdownMenuButton_click')
  }


  changeOrderStatusFilter(btn: string, status: string) {
    $(`.${btn}`).text(status)
    $(`.dropdown-menu-list`).slideUp(300)
    $('.search_dropdownMenuButton').removeClass('search_dropdownMenuButton_click')


  }


  changeOrderStatus(btnIndicator: number, status: string) {
    $(`.search_dropdownMenuButton${btnIndicator}`).text(status)
    $(`.dropdown-menu-list`).slideUp(300)
    $('.search_dropdownMenuButton').removeClass('search_dropdownMenuButton_click')


  }


  getPageContent(page: number) {
    if (page <= 0) {
      page = 1
    }
    if (page >= this.pages) {
      page = this.pages
    }

    if (this.currentPage == page) {
      return;
    }

    console.log({ page });
    $(`.page`).removeClass('ActivePage')
    $(`.page${page}`).addClass('ActivePage')
    this.currentPage = page
    const skip = ((this.currentPage - 1) * this.pageSize)
    this.productList = this.fullProductList.slice(skip, skip + this.pageSize);

  }

  previousPage() {
    this.getPageContent(this.currentPage - 1)
  }
  nextPage() {
    this.getPageContent(this.currentPage + 1)
  }

  changeVendorStatusGraph(x: any, y: any) {
  }

  displayProductDetails(id: string) {
    this._Router.navigateByUrl(`admin/product/${id}/details`)
  }
  updateProductDetails(id: string) {
    this._Router.navigateByUrl(`admin/product/${id}/update`)
  }
  deleteProduct(id: string) {
    this._ProductService.deleteProductById(id).subscribe(res => {
      console.log({ res });
      this.currentPage = 1;
      return this.getAllProducts()
    }, err => {
      alert("Some thing went wrong")
    })
  }
  addProduct() {
    this._Router.navigateByUrl(`admin/product/add`)
  }

  closeOrderDetailsSec() {
  }

}