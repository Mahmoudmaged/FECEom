import { Component, OnInit } from '@angular/core';
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
  constructor() { }

  ngOnInit(): void {
  }


  showDropDown(classSelector: string, dropdownSelector: string) {
    //remover from siblings
    $(`.dropdown-menu-list`).not(`.${dropdownSelector}`).slideUp(300)
    $('.search_dropdownMenuButton').not(`.${classSelector}`).removeClass('search_dropdownMenuButton_click')
    //Display target dropdown
    $(`.${dropdownSelector}`).slideToggle(300)
    $(`.${classSelector}`).toggleClass('search_dropdownMenuButton_click')
  }


  changeOrderStatus(btn: string, status: string) {
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

 

  displayVendorProf() {
    $(".orderTable").hide(200)
    $(".OrderDetailsSec").show(300)
  
  }

  closeOrderDetailsSec() {
    $(".OrderDetailsSec").hide(200)
    $(".orderTable").show(300)
  }

}
