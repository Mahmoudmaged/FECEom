import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables, Colors } from 'chart.js'
declare let $: any;
// import  {ApexChart} from 'ngx-apexcharts'
@Component({
  selector: 'app-vendor-profile',
  templateUrl: './vendor-profile.component.html',
  styleUrls: ['./vendor-profile.component.scss']
})
export class VendorProfileComponent implements OnInit {
  orderList: any = []
  pages: number = 10;
  pageSize = 8
  currentPage = 1
  chartOneData = [
    { year: 2010, count: 10, month: 1, monthCount: 25, day: 10, dayCount: 15 },
    { year: 2011, count: 20, month: 2, monthCount: 40, day: 25, dayCount: 45 },
    { year: 2012, count: 15, month: 3, monthCount: 25, day: 20, dayCount: 35 },
    { year: 2013, count: 25, month: 4, monthCount: 50, day: 17, dayCount: 60 },
    { year: 2014, count: 22, month: 7, monthCount: 90, day: 12, dayCount: 20 },
    { year: 2015, count: 30, month: 6, monthCount: 60, day: 8, dayCount: 15 },
    { year: 2016, count: 28, month: 8, monthCount: 120, day: 30, dayCount: 80 },
  ];
  pieData = {
    labels: [
      'Continue',
      'Continue',
      'Suspend',
      'Declined'
    ],
    datasets: [{
      data: [25, 25, 35, 15],
      // borderRadius:[100],
      backgroundColor: [
        '#81ffca',
        '#81ffca',
        '#D80008',
        '#FFDCDC'
      ],

    }
    ]
  };
  myFirstChart: any;
  pieChart: any;
  constructor(private _Router:Router) {

    Chart.register(...registerables)
    Chart.register(Colors)
  }

  ngOnInit(): void {

    if (this.chartOneData.length > 0) {
      this.myFirstChart = new Chart("myChart",
        {
          type: 'line',
          data: {
            labels: this.chartOneData.map(row => row['year']),
            datasets: [
              {
                label: 'Acquisitions by year',
                type: 'line',
                backgroundColor: '#81ffca',
                borderColor: '#81ffca',
                data: this.chartOneData.map(row => row['count'])
              }
              ,
              {
                label: 'Acquisitions by month',
                backgroundColor: '#FFDCDC',
                borderColor: '#FFDCDC',
                borderDash: [3, 5],
                data: this.chartOneData.map(row => row['monthCount']),
              },
              {
                label: 'Acquisitions by Day',
                backgroundColor: '#D80008',
                borderColor: '#D80008',
                borderDash: [3, 5],
                data: this.chartOneData.map(row => row['dayCount'])
              }
            ]
          }
        }
      );
    }




    this.pieChart = new Chart("myChart2",
      {
        type: 'doughnut',
        data: this.pieData,

      },
    );
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

    switch (status) {
      case "declined":
        $(`.${btn}`).css({ 'background-color': '#D80008' })
        break;
      case "suspended":
        $(`.${btn}`).css({ 'background-color': '#ffdcdc' })
        break;
      case "continue":
        $(`.${btn}`).css({ 'background-color': '#81ffca' })
        break;
      default:
        break;
    }
  }

  changeVendorStatus(btn: string, status: string) {
    $(`.${btn}`).text(status)
    $(`.dropdown-menu-list`).slideUp(300)
    $('.search_dropdownMenuButton').removeClass('search_dropdownMenuButton_click')

    switch (status) {
      case "declined":
        $(`.${btn}`).css({ 'background-color': '#D80008' })
        break;
      case "suspended":
        $(`.${btn}`).css({ 'background-color': '#ffdcdc' })
        break;
      case "continue":
        $(`.${btn}`).css({ 'background-color': '#81ffca' })
        break;
      default:
        break;
    }
  }




  changeOrderStatusGraph(btn: string, status: string) {
    $(`.${btn}`).text(status)
    $(`.dropdown-menu-list`).slideUp(300)
    $('.search_dropdownMenuButton').removeClass('search_dropdownMenuButton_click')

    switch (status) {
      case "year":
        $(`.${btn}`).css({ 'background-color': '#ffedc3' })
        break;
      case "month":
        $(`.${btn}`).css({ 'background-color': '#ffdcdc' })
        break;
      case "day":
        $(`.${btn}`).css({ 'background-color': '#81ffca' })
        break;
      default:
        break;
    }

    return this.displayLineChart(status);


  }

  displayLineChart(filter: string) {

    if (this.myFirstChart) {
      this.myFirstChart.destroy()

    }

    let mapLabel;
    switch (filter) {
      case 'year':
        mapLabel = this.chartOneData.map(row => row['year']);
        break;
      case 'month':
        mapLabel = this.chartOneData.map(row => row['month']);
        break;
      case 'day':
        mapLabel = this.chartOneData.map(row => row['day']);
        break;

      default:
        break;
    }

    this.myFirstChart = new Chart("myChart",
      {
        type: 'line',
        data: {
          labels: mapLabel,
          datasets: [
            {
              label: 'Acquisitions by year',
              type: 'line',
              backgroundColor: '#81ffca',
              borderColor: '#81ffca',
              data: this.chartOneData.map(row => row['count'])
            }
            ,
            {
              label: 'Acquisitions by month',
              backgroundColor: '#FFDCDC',
              borderColor: '#FFDCDC',
              borderDash: [3, 5],
              data: this.chartOneData.map(row => row['monthCount']),
            },
            {
              label: 'Acquisitions by Day',
              backgroundColor: '#D80008',
              borderColor: '#D80008',
              borderDash: [3, 5],
              data: this.chartOneData.map(row => row['dayCount'])
            }
          ]
        }
      },
    );



  }



  closeVendorProf() {
     this._Router.navigateByUrl("/admin/vendor")
  }

}
