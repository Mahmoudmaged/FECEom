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
  offerList: any[] = []
  fullOfferList: any[] = []

  pages: number = 10;
  pageSize = 4
  currentPage = 1
  textSearch: string = ''
  load: boolean = false;
  sideMessage: String = '';
  constructor(private _Router: Router, private _OfferService: OfferService) {
    this.getOffersList()

  }
  ngOnInit(): void {

  }
  showSideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-200%" })
    }, 3000);
  }



  onSearch() {
    if (this.textSearch) {
      this.fullOfferList = this.fullOfferList.filter(ele => {
        return ele.titleEn.toLowerCase().includes(this.textSearch.toLowerCase())
      });

      this.pages = Math.ceil(this.fullOfferList.length / this.pageSize);//(`${res.length / this.pageSize}`);
      this.offerList = this.fullOfferList.slice(0, this.pageSize);

    } else {
      this.getOffersList()
    }

  }

 


  getOffersList() {
    this.load = true
    return this._OfferService.allOffers().subscribe(res => {
      this.pages = Math.ceil(res.length / this.pageSize);//(`${res.length / this.pageSize}`);
      this.fullOfferList = res;
      this.offerList = this.fullOfferList.slice(0, this.pageSize);
      this.load = false
    }, err => {
      this.load = false
      this.showSideError('Fail')
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

  showOfferDetails(id: string) {
    this._Router.navigateByUrl(`/admin/offer/${id}/details`)

  }
  editOffer(id: string) {
    this._Router.navigateByUrl(`/admin/offer/${id}/edit`)
  }
  deleteOffer(id: string) {
    this.load = true;
    this._OfferService.deleteOfferById(id).subscribe(res => {
      this.getOffersList()
      this.load = false;
    }, err => {
      this.load = false;
      this.showSideError('Fail to delete please try again')
    })
  }

}
