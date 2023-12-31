import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AttachmentsService } from 'src/app/Services/attachments.service';
import { CategoryService } from 'src/app/Services/category.service';
import { OfferService } from 'src/app/Services/offer.service';
declare let $: any;
@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.scss']
})
export class AddOfferComponent {
  selectedValues: string[] = [];
  offerList: any = []
  base: any;
  image: any;
  errorMessage: string = ''
  userInfo: any;
  selectedImage: string = '';
  categoryList: any = [];
  load: boolean = false;
  sideMessage: string = '';
  showSideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-200%" })
    }, 3000);
  }
  
  constructor(
    private _CategoryService: CategoryService, private _AttachmentsService: AttachmentsService, private _OfferService: OfferService, private _Router: Router) {
    this.getAllCategory()
  }

  getAllCategory() {
    return this._CategoryService.categoryList().subscribe(res => {
      this.categoryList = res;
    }, err => {
      this.showSideError("Fail to load product category list ")
    })
  }

  addOfferForm = new FormGroup({
    photoId: new FormControl('', [Validators.required]),
    code: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    titleEn: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    descriptionEn: new FormControl('', [Validators.required]),
    percent: new FormControl('', [Validators.required]),
    offerType: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    isActive: new FormControl(true, [Validators.required]),
    offerCategoryId: new FormControl('', [Validators.required]),
  })

  handelAddOffer() {
    this.load = true;
    if (!this.image) {
      this.errorMessage = "Image is required"
    }
    let data = this.addOfferForm.value
    data.photoId = this.image

    this._OfferService.addOffer(data).subscribe((res) => {
      this.load = false
      this._Router.navigateByUrl("/admin/offers")
    }, err => {
      this.load = false;
      this.showSideError('Fail to add please try again')
    })
  }


  selectImage(event: any) {
    this.load = true;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedImage = e.target.result;

      this.base = this.selectedImage
      console.log({ fileName: event.target.files[0].name, file: this.selectedImage.split("base64,")[1] });

      return this._AttachmentsService.uploadAttachBase64({
        fileName: event.target.files[0].name, file: this.selectedImage.split("base64,")[1]
      }).subscribe(res => {
        this.load = false;

        this.image = res
      }, err => {
        this.load = false;
        this.showSideError('Fail to upload ');
      }
      )

    };
    reader.readAsDataURL(file);
  }

  close() {
    this._Router.navigateByUrl("/admin/offers")
  }
}
