import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AttachmentsService } from 'src/app/Services/attachments.service';
import { BrandService } from 'src/app/Services/brand.service';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';
declare let $: any;
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})


export class AddProductComponent implements OnInit {
  load: boolean = false;
  sideMessage: string = '';
  productOptions: any = [];
  productSelectedOptions: any = [];
  selectedValues: string[] = [];
  subcategoryList: any[] = []
  categoryList: any = []
  optionList: any = []
  brandList: any = []
  images: any = [];
  errorMessage: string = ''
  userInfo: any;
  selectedImage: string = '';
  imagesList: any = []

  showSideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-200%" })
    }, 3000);
  }

  constructor(private _Router: Router,
    private _ProductService: ProductService,
    private _CategoryService: CategoryService,
    private _BrandService: BrandService,
    private _AttachmentsService: AttachmentsService) {

    this.userInfo = JSON.parse(localStorage.getItem('user')!);
    this.getAllCategory()
    this.getAllBrands()
    this.getAllOption()
  }






  selectImage(event: any) {


    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
        return this._AttachmentsService.uploadAttachBase64({ fileName: event.target.files[i].name, file: this.selectedImage.split("base64,")[1] }).subscribe(res => {
          this.imagesList.push({
            photoId: res
          })
        }, err => {
          this.showSideError('Fail to upload please try again')
        }
        )

      };
      reader.readAsDataURL(file);
    }





  }

  getAllOption() {
    return this._ProductService.getOptionList().subscribe(res => {
      this.optionList = res;
    }, err => {
      this.showSideError('Fail to load product options please try again.')
    }
    )
  }

  getAllCategory() {
    return this._CategoryService.categoryList().subscribe(res => {
      this.categoryList = res;
    }, err => {
      this.showSideError("Fail to load product category list ")
    })
  }

  getAllBrands() {
    return this._BrandService.brandList().subscribe(res => {
      console.log({ res });
      this.brandList = res;
    }, err => {
      this.showSideError("Fail to load product brand list ")


    })
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
    subcategory: new FormControl('', [Validators.required]),
    brand: new FormControl('', [Validators.required]),
    available: new FormControl('available', [Validators.required]),

  })



  getSubCategory() {
    return this._CategoryService.getListOfSubCategoriesById(this.addProductForm.controls.category.value).subscribe(res => {
      this.subcategoryList = res
    }, err => {
      console.log("iN-VALID CATEGORY ID");
      this.showSideError("In-valid category id")
    })
  }

  handelAddProduct() {
    this.load = true;
    if (!this.imagesList.length) {
      this.showSideError(`Please upload  product images`)
    }

    let selectedOptions: any[] = []
    if (this.addProductForm.controls.productOptions.value) {
      let selectOptions = this.addProductForm.controls.productOptions.value
      for (let i = 0; i < selectOptions.length; i++) {
        selectedOptions.push({
          optionId: selectOptions[i],
          price: 0
        })

      }


      selectedOptions = selectedOptions.map(ele => {
        return {
          optionId: ele.optionId.id,
          price: 0
        }
      })

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
      categoryId: this.addProductForm.controls.subcategory.value,
      brandId: this.addProductForm.controls.brand.value,
      vendorId: "06eff051-2254-4eb7-d4fc-08dbbb387eb9",//this.userInfo.id ,//"06eff051-2254-4eb7-d4fc-08dbbb387eb9",
      paymentType: "string",
      noteForReturn: this.addProductForm.controls.noteForReturn.value || 'string',
      amount: this.addProductForm.controls.amount.value,
      productImages: this.imagesList,
      productOptions: selectedOptions.length ? selectedOptions : [],
      productDetails: [],

    }


    this._ProductService.addProduct(data).subscribe(res => {
      this.load = false;
      this._Router.navigateByUrl("/admin/product")
    },
      err => {
        this.load = false;
        this.showSideError(`Some thing went wrong please try again`)
      }
    )
  }



  ngOnInit(): void {

  }



  closeProductDetailsSec() {
    this._Router.navigateByUrl(`admin/product`)

  }
}
