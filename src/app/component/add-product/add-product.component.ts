import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AttachmentsService } from 'src/app/Services/attachments.service';
import { BrandService } from 'src/app/Services/brand.service';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {

  selectedValues: string[] = [];
  categoryList: any = []
  brandList: any = []
  images: any = [];
  errorMessage: string = ''

  userInfo: any;


  constructor(private _Router: Router,
    private _ProductService: ProductService,
    private _CategoryService: CategoryService,
    private _BrandService: BrandService,
    private _AttachmentsService: AttachmentsService) {

    this.userInfo = JSON.parse(localStorage.getItem('user')!);
    this.getAllCategory()
    this.getAllBrands()
  }



  selectedImage: string = '';
  imagesList: any = []


  selectImage(event: any) {


    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
        console.log({ im: this.selectedImage });

        return this._AttachmentsService.uploadAttachBase64({ fileName: event.target.files[i].name, file: this.selectedImage }).subscribe(res => {
          this.imagesList.push({

            photoId: res
          })
          console.log({ res });
        }, err => {
          console.log({ err });
        }
        )

      };
      reader.readAsDataURL(file);
    }





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

  addProductForm = new FormGroup({
    image: new FormControl('', [Validators.required]),
    productName: new FormControl('', [Validators.required]),
    productNameEn: new FormControl('', [Validators.required]),
    productDescription: new FormControl('', [Validators.required]),
    productDescriptionEn: new FormControl('', [Validators.required]),

    defaultPrice: new FormControl('', [Validators.min(1), Validators.required]),
    oldPrice: new FormControl('', [Validators.min(1), Validators.required]),
    amount: new FormControl('', [Validators.min(1), Validators.required]),


    productOptions: new FormControl('', []),
    noteForReturn: new FormControl('', []),
    // InventoryName: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    brand: new FormControl('', [Validators.required]),
    available: new FormControl('available', [Validators.required]),

  })

  handelAddProduct() {

    if (!this.imagesList.length) {
      this.errorMessage = "Image is required"
    }

    let data = {
      name: this.addProductForm.controls.productName.value,
      nameEn: this.addProductForm.controls.productNameEn.value,
      description: this.addProductForm.controls.productDescription.value,
      descriptionEn: this.addProductForm.controls.productDescriptionEn.value,

      defaultPrice: this.addProductForm.controls.defaultPrice.value,
      oldPrice: this.addProductForm.controls.oldPrice.value,
      orderNUmber: 0,

      htmlDescriptions: "string",
      htmlOther: "string",

      isActive: this.addProductForm.controls.available.value == 'available' ? true : false,



      defaultPhotoId: this.imagesList[0].photoId,
      categoryId: this.addProductForm.controls.category.value,
      brandId: this.addProductForm.controls.brand.value,
      vendorId: this.userInfo.id,
      paymentType: "string",
      noteForReturn: this.addProductForm.controls.noteForReturn.value || 'string',
      amount: this.addProductForm.controls.amount.value,
      productImages: this.imagesList,
      productOptions: [],
      productDetails: [],


  
    }
    // let data = {
    //   "name": this.addProductForm.controls.productName.value,
    //   "nameEn":this.addProductForm.controls.productNameEn.value,
    //   "description": this.addProductForm.controls.productDescription.value,
    //   "descriptionEn": "test",
    //   "defaultPrice": 800,
    //   "oldPrice": 800,
    //   "orderNUmber": 0,
    //   "htmlDescriptions": "string",
    //   "htmlOther": "string",
    //   "isActive": true,
    //   "defaultPhotoId": "0cdc602c-8d85-4e06-a419-b5b929ba4aab",
    //   "categoryId": "7e147909-a832-44b5-0f73-08dbbb20ed09",
    //   "brandId": "6ba35d06-595f-4581-a09d-08dbbfbcc967",
    //   "vendorId": "06eff051-2254-4eb7-d4fc-08dbbb387eb9",
    //   "paymentType": "string",
    //   "noteForReturn": "string",
    //   "amount": 160,
    //   "productImages": [
    //     {

    //       "photoId": "0cdc602c-8d85-4e06-a419-b5b929ba4aab"
    //     }
    //   ],
    //   "productOptions": [
    //   ],
    //   "productDetails": [

    //   ]
    // }
    console.log({ data });

    this._ProductService.addProduct(JSON.stringify(data)).subscribe(res => {
      console.log({ res });
    },
      err => {
        console.log({ err });

      }
    )
  }


  handelBasicUpdate(): any {
    const formData = new FormData();

    if (!this.images) {
      this.errorMessage = "Image is required"
    }
    formData.append("image", this.images);


    //   this._UserService.updateBasicInfo(formData).subscribe(
    //     res => {
    //       this.load = false;
    //       const { message } = res
    //       if (message == "Done") {
    //         this.changeColor("mapDiv-card")
    //         this.sideMessage = "Updated Successfully"
    //         $(".sideAlert").css({ "right": "0%" })
    //         setTimeout(() => {
    //           $(".sideAlert").css({ "right": "-200%" })
    //         }, 3000);
    //         this.profileData()
    //       }
    //     }, err => {

    //       this.load = false;
    //       this.errorMessage = "Fail To update"
    //     })
  }


  ngOnInit(): void {
  }



  closeProductDetailsSec() {
    this._Router.navigateByUrl(`admin/product`)

  }
}
