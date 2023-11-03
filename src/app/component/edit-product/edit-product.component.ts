import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AttachmentsService } from 'src/app/Services/attachments.service';
import { BrandService } from 'src/app/Services/brand.service';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';
declare let $: any;
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  product: any;
  selectedValues: string[] = [];
  categoryList: any = []
  brandList: any = []
  images: any = [];
  optionList: any = []
  errorMessage: string = ''

  userInfo: any;


  constructor(private _Router: Router,
    private _ProductService: ProductService,
    private _CategoryService: CategoryService,
    private _BrandService: BrandService,
    private _AttachmentsService: AttachmentsService,
    private _ActivatedRoute: ActivatedRoute) {

    this.userInfo = JSON.parse(localStorage.getItem('user')!);
    this.getAllCategory()
    this.getAllBrands()
    this.getProductByID(this._ActivatedRoute.snapshot.paramMap.get('id')!)
    this.getAllOption()

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

        return this._AttachmentsService.uploadAttachBase64({ fileName: event.target.files[i].name, file: this.selectedImage.split("base64,")[1] }).subscribe(res => {
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

  getAllOption() {
    return this._ProductService.getOptionList().subscribe(res => {
      console.log({ res });
      this.optionList = res;
    }, err => {
      console.log({ err });

    }
    )
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
    image: new FormControl('', []),
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

  getProductByID(id: any) {
    return this._ProductService.getProductWithId(id).subscribe(res => {
      console.log({ res });
      this.product = res
      this.addProductForm.controls.productName.setValue(this.product.name)
      this.addProductForm.controls.productNameEn.setValue(this.product.nameEn)
      this.addProductForm.controls.productDescription.setValue(this.product.description)
      this.addProductForm.controls.productDescriptionEn.setValue(this.product.descriptionEn)
      this.addProductForm.controls.defaultPrice.setValue(this.product.defaultPrice)
      this.addProductForm.controls.oldPrice.setValue(this.product.oldPrice)
      this.addProductForm.controls.amount.setValue(this.product.amount)
      this.addProductForm.controls.productOptions.setValue(this.product.productOptions)
      this.addProductForm.controls.noteForReturn.setValue(this.product.noteForReturn)
      this.addProductForm.controls.category.setValue(this.product.categoryId)
      this.addProductForm.controls.brand.setValue(this.product.brandId)
      this.addProductForm.controls.available.setValue(this.product.isActive ? 'available' : 'unavailable')

    }, err => {
      console.log({ err });
    }
    )
  }


  handelAddProduct() {
    if (!this.imagesList.length) {
      this.errorMessage = "Image is required"
    }

    let selectedOptions = []
    if (this.addProductForm.controls.productOptions.value) {
      let selectOptions = this.addProductForm.controls.productOptions.value
      for (let i = 0; i < selectOptions.length; i++) {
        selectedOptions.push({
          optionId: selectOptions[i],
          price: 0
        })

      }

    }

    let data = {
      id: this.product.id,
      name: this.addProductForm.controls.productName.value,
      nameEn: this.addProductForm.controls.productNameEn.value,
      description: this.addProductForm.controls.productDescription.value,
      descriptionEn: this.addProductForm.controls.productDescriptionEn.value,

      defaultPrice: this.addProductForm.controls.defaultPrice.value,
      oldPrice: this.addProductForm.controls.oldPrice.value,
      orderNUmber: 0,

      htmlDescriptions: "string",
      htmlOther: "string",

      isActive: (this.addProductForm.controls.available.value == 'available' || this.addProductForm.controls.available.value == `true`) ? true : false,

      defaultPhotoId: this.imagesList.length ? this.imagesList[0].photoId : this.product.defaultPhotoId,
      categoryId: this.addProductForm.controls.category.value,
      brandId: this.addProductForm.controls.brand.value,
      vendorId:  "06eff051-2254-4eb7-d4fc-08dbbb387eb9" , //this.userInfo.id,,
      paymentType: "string",
      noteForReturn: this.addProductForm.controls.noteForReturn.value || 'string',
      amount: this.addProductForm.controls.amount.value,
      productImages: this.imagesList.length ? this.imagesList : this.product.imagesList,
      productOptions: selectedOptions.length ? selectedOptions : [],
      productDetails: [],



    }
    this._ProductService.updateProduct(data).subscribe(res => {
      console.log({ res });
      this._Router.navigateByUrl("/admin/product")
    },
      err => {
        console.log({ err });

      }
    )
  }





  ngOnInit(): void {
  }



  closeProductDetailsSec() {
    this._Router.navigateByUrl(`admin/product`)

  }
}
