import {
  Component, OnInit
} from '@angular/core';
import { FinancialManagementComponent } from '../financial-management/financial-management.component';
import { Router } from '@angular/router';
declare let $: any
@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  photo: string = `../../../assets/images/avatar/ava.png`
  userInfo: any;
  constructor(public _Router: Router) {

    this.userInfo = JSON.parse(localStorage.getItem('user')!);
    this.photo = this.userInfo?.photo || this.photo;

  }

  ngOnInit(): void {
  }

  changeDisplay(item: string, component: string): any {
    //hide all
    $(`.listItem`).children("span").removeClass("ActiveCheck")
    $(`.listItem`).children("i").hide();
    //Display 
    $(`.${item}`).children("span").addClass("ActiveCheck")
    $(`.${item}`).children("i").show()

    this._Router.navigateByUrl(`/admin/${component}`) // thanks to lazyLoading with nesting routing
    window.scrollTo(0, 0)
  }

  changeComponent(sec: string) {

  }

}
