import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AttachmentsService } from 'src/app/Services/attachments.service';
import { CategoryService } from 'src/app/Services/category.service';

declare let $: any;
@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.scss']
})
export class AddSubcategoryComponent implements OnInit {

  selectedValues: string[] = [];
  categoryList: any = []
  brandList: any = []
  base: any;
  image: any;
  errorMessage: string = ''

  userInfo: any;
  selectedImage: string = '';
  constructor(
    private _CategoryService: CategoryService,
    private _AttachmentsService: AttachmentsService,
    private _Router: Router) {
      this.getAllCategory()
  }

  selectImage(event: any) {


    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedImage = e.target.result;

      this.base = this.selectedImage
      console.log({ fileName: event.target.files[0].name, file: this.selectedImage.split("base64,")[1] });

      return this._AttachmentsService.uploadAttachBase64({
        fileName: event.target.files[0].name, file: this.selectedImage.split("base64,")[1]
      }).subscribe(res => {
        this.image = res
        console.log({ res });
      }, err => {
        console.log({ err });
      }
      )

    };
    reader.readAsDataURL(file)

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
  addCategoryForm = new FormGroup({
    image: new FormControl('', [Validators.required]),
    categoryName: new FormControl('', [Validators.required]),
    categoryNameEn: new FormControl('', [Validators.required]),
    categoryDescription: new FormControl('', [Validators.required]),
    categoryDescriptionEn: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  })

  handelAddCategory() {

    if (!this.image) {
      this.errorMessage = "Image is required"
    }

    let data = {
      name: this.addCategoryForm.controls.categoryName.value,
      nameEn: this.addCategoryForm.controls.categoryNameEn.value,
      description: this.addCategoryForm.controls.categoryDescription.value,
      descriptionEn: this.addCategoryForm.controls.categoryDescriptionEn.value,
      categoryPhotoId: this.image,
      order: 0,
      mainCategoryId: this.addCategoryForm.controls.category.value,
    }

    console.log({ data });

    this._CategoryService.addCategory(data).subscribe(res => {
      console.log({ res });
      this._Router.navigateByUrl("/admin/category")
    },
      err => {
        console.log({ err });

      }
    )
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

    if (status == 'Notifications') {
      $(".Notifications").show()
      $(".PaymentGateways").hide()
    } else {
      $(".Notifications").hide()
      $(".PaymentGateways").show()
    }

  }


  closeCategoryDetailsSec() {

  }

}


