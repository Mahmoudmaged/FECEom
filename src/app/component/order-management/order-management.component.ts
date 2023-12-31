import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/Services/order.service';
declare let $: any;
@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit {
  orderList: any = []
  pages: number = 20;
  pageSize = 8
  currentPage = 1
  photo: string = `../../../assets/images/avatar/ava.png`
  userInfo: any;
  constructor(private _Router: Router, private _OrderService: OrderService) {
    this.userInfo = JSON.parse(localStorage.getItem('user')!);
    this.photo = this.userInfo?.photo || this.photo;
    this.getAllOrders(this.userInfo?.id)
  }



  ngOnInit(): void {
  }

  getAllOrders(userId: string) {
    return this._OrderService.getOrderList(userId).subscribe(res => {
      console.log({ res });
      this.orderList = res
    }, err => {
      console.log({ err });

    }
    )
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
  changeOrderStatusFilter(btn: string, status: string) {
    $(`.${btn}`).text(status)
    $(`.dropdown-menu-list`).slideUp(300)
    $('.search_dropdownMenuButton').removeClass('search_dropdownMenuButton_click')

    switch (status) {
      case "processing":
        $(`.${btn}`).css({ 'background-color': '#ffedc3' })
        break;
      case "chipped":
        $(`.${btn}`).css({ 'background-color': '#ffdcdc' })
        break;
      case "delivered":
        $(`.${btn}`).css({ 'background-color': '#81ffca' })
        break;
      case "Order Status":
        $(`.${btn}`).css({ 'background-color': '#ffff' })
        break;
      default:
        break;
    }
  }


  changeOrderStatus(btnIndicator: number, status: string) {
    $(`.search_dropdownMenuButton${btnIndicator}`).text(status)
    $(`.dropdown-menu-list`).slideUp(300)
    $('.search_dropdownMenuButton').removeClass('search_dropdownMenuButton_click')

    switch (status) {
      case "processing":
        $(`.search_dropdownMenuButton${btnIndicator}`).css({ 'background-color': '#ffedc3' })
        break;
      case "chipped":
        $(`.search_dropdownMenuButton${btnIndicator}`).css({ 'background-color': '#ffdcdc' })
        break;
      case "delivered":
        $(`.search_dropdownMenuButton${btnIndicator}`).css({ 'background-color': '#81ffca' })
        break;
      case "Order Status":
        $(`.search_dropdownMenuButton${btnIndicator}`).css({ 'background-color': '#ffff' })
        break;
      default:
        break;
    }
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

  }

  previousPage() {
    this.getPageContent(this.currentPage - 1)
  }
  nextPage() {
    this.getPageContent(this.currentPage + 1)
  }


  changeVendorStatusGraph(x: any, y: any) {

  }

  displayOrderDetails(id: string) {
    $(".orderTable").hide(200)
    $(".OrderDetailsSec").show(300)
    this._Router.navigateByUrl(`admin/order/${id}/details`)
  }

  closeOrderDetailsSec() {
    $(".OrderDetailsSec").hide(200)
    $(".orderTable").show(300)
  }

}
