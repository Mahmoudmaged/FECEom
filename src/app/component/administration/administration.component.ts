import { Component, OnInit } from '@angular/core';
declare let $: any
@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  changeDisplay(item: string, component: string): any {
    //hide all
    $(`.listItem`).children("span").removeClass("ActiveCheck")
    $(`.listItem`).children("i").hide();
    //Display only myDisplay 
    $(`.${item}`).children("span").addClass("ActiveCheck")
    $(`.${item}`).children("i").show()

    $(`.componentSection`).hide();
    $(`.${component}`).show();
  }

  changeComponent(sec: string) {

  }

}
