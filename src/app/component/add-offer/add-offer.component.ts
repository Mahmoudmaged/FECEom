import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AttachmentsService } from 'src/app/Services/attachments.service';
import { OfferService } from 'src/app/Services/offer.service';

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
  constructor(private _AttachmentsService: AttachmentsService, private _OfferService: OfferService, private _Router: Router) {

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
  })
  handelAddOffer() {



    if (!this.image) {
      this.errorMessage = "Image is required"
    }
    let data = this.addOfferForm.value
    console.log(data);
    data.photoId = this.image
    this._OfferService.addOffer(data).subscribe((res) => {
      console.log(res);
      this._Router.navigateByUrl("/admin/offers")
    })
  }

  selectImage(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedImage = e.target.result;
      this.base = this.selectedImage
      console.log({ fileName: event.target.files[0].name, file: this.selectedImage.split("base64,")[1] });
      let data = {
        fileName: event.target.files[0].name, file: this.selectedImage.split("base64,")[1]
      }
      return this._AttachmentsService.uploadAttachBase64(data).subscribe(res => {
        this.image = res
        this.addOfferForm.controls['photoId'] = this.image
      }, err => {
        console.log({ err });
      }
      )

    };
    reader.readAsDataURL(file);
  }
  close() {
    this._Router.navigateByUrl("/admin/offers")
  }
}
