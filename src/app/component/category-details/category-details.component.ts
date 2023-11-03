import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
declare let $: any;
@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent {
  categoryList: any = []
  category: any;
  constructor(private _CategoryService: CategoryService, private _Router: Router, private _ActivatedRoute: ActivatedRoute) {
    this.getSubCategoriesById(this._ActivatedRoute.snapshot.paramMap.get('id')!)
    this.getCategoryById(this._ActivatedRoute.snapshot.paramMap.get('id')!)
  }

  ngOnInit(): void {

  }

  getCategoryById(id: any) {
    return this._CategoryService.getCategoryWithId(id).subscribe(res => {
      this.category = res
      console.log({ res });

    }, err => {
      console.log({ err });

    })
  }
  getSubCategoriesById(id: any) {
    return this._CategoryService.getListOfSubCategoriesById(id).subscribe(res => {
      this.categoryList = res
      console.log({ res });

    }, err => {
      console.log({ err });

    })
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

    if (status == 'Category') {
      this._Router.navigateByUrl("/admin/category/add")
    } else {
      this._Router.navigateByUrl("/admin/category/add/sub")
    }

  }

  getCategoryDetails(id: string) {
    this.getSubCategoriesById(id!)
    this.getCategoryById(id!)
  }


  showUpdateCategory(id: any) {

    if (!this.category.mainCategoryId) {
      this._Router.navigateByUrl(`/admin/category/${id}/edit`)
    } else {
      this._Router.navigateByUrl(`/admin/category/${id}/sub/edit`)
    }
  }

  deleteCategory(id: any) {
    this._CategoryService.deleteCategoryById(id).subscribe(res => {
      console.log({ res });
      if (res) {
        this._Router.navigateByUrl("/admin/category")
      }
    }, err => {
      console.log({ err });

    })
  }
}
