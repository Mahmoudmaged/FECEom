import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OfferService } from 'src/app/Services/offer.service';
declare let $: any;

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})

export class OfferComponent {
  offerList: any = []
  fullOfferList: any = []

  pages: number = 10;
  pageSize = 8
  currentPage = 1

  constructor(private _Router: Router, private _OfferService: OfferService) {
    this.getOffersList()

  }

  ngOnInit(): void {

  }

  getOffersList() {
    return this._OfferService.allOffers().subscribe(res => {

      this.pages = Math.ceil(res.length / this.pageSize);//(`${res.length / this.pageSize}`);
      this.fullOfferList = res;
      this.offerList = this.fullOfferList.slice(0, this.pageSize);
    }, err => {
      console.log({ err });
    }
    )
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
    this.offerList = this.fullOfferList.slice(skip, skip + this.pageSize);

  }

  previousPage() {
    this.getPageContent(this.currentPage - 1)
  }
  nextPage() {
    this.getPageContent(this.currentPage + 1)
  }

  addOffer() {
    this._Router.navigateByUrl(`admin/offers/add`)
  }


}
