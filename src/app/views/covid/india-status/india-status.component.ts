import { element } from 'protractor';
import { hexToRgba, getStyle } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { CovidService } from './../../../covid-shared/covid.service';
import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { StockChart } from 'angular-highcharts';


// import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';



@Component({
  selector: 'app-india-status',
  templateUrl: './india-status.component.html',
  styleUrls: ['./india-status.component.css'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 1500, noPause: false } },
  ]
})
export class IndiaStatusComponent implements OnInit {

  stock: StockChart;
  // myInterval: number | false = 6000;
  slides: any[] = [];
  activeSlideIndex: number = 0;
  noWrapSlides: boolean = false;

  @ViewChild('infoModal') public infoModal: ModalDirective;



  statesWiseDatas: any = [];
  indiaTotal: any = [];
  stateList: any = [];

  indiaTotalCOnfirmed: number = 0;
  indiaTotalDeaths: number = 0;
  indiaTotalRecoverd: number = 0;
  indiaTotalActive: number = 0;
  lastUpdateTime: any = "";


  indiaMapData: any = [];
  mapStateName: string = "";
  downloadData = [
    // [1, 'Finland', 7.632, 'Helsinki'],
    // [2, 'Norway', 7.594, 'Oslo'],
    // [3, 'Denmark', 7.555, 'Copenhagen'],
    // [4, 'Iceland', 7.495, 'Reykjavík'],
    // [5, 'Switzerland', 7.487, 'Bern'],
    // [9, 'Sweden', 7.314, 'Stockholm'],
    // [73, 'Belarus', 5.483, 'Minsk'],
  ];



  getMapStates(event: any) {
    this.indiaMapData = [];
    this.downloadData = [];
    const target = event.target || event.srcElement || event.currentTarget;
    const idAttr = target.attributes.id;
    const value = idAttr.nodeValue;
    console.log("gettingg Datassss", value);
    this.mapStateName = value;

    console.log("INDIA TOTAL DATASSS", this.indiaTotal);
    for (let j = 1; j < this.indiaTotal.length; j++) {
          if (value === this.indiaTotal[j].state) {
            this.indiaMapData.push({
              stateName: this.indiaTotal[j].state,
              confirmed: this.indiaTotal[j].confirmed,
              active: this.indiaTotal[j].active,
              deaths: this.indiaTotal[j].deaths,
              recoverd: this.indiaTotal[j].recovered,
              lastupdatedtime: this.indiaTotal[j].lastupdatedtime,
              todaysCases: this.indiaTotal[j].deltaconfirmed,
              todaysRecoverd: this.indiaTotal[j].deltarecovered,
              todaysDeath: this.indiaTotal[j].deltadeaths,
            });
            break;
          }
      }

      for (let j = 1; j < this.indiaTotal.length; j++) {
        if (value === this.indiaTotal[j].state) {
          this.downloadData.push(this.indiaTotal[j].confirmed,
            this.indiaTotal[j].active,
            this.indiaTotal[j].deaths,
            this.indiaTotal[j].recovered);
        }
      }
  }

   // Pie
   public pieChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
   public pieChartData: number[] = [300, 500, 100];
   public pieChartType = 'pie';

   // chart events
   public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }


  constructor( public restState: CovidService, private el: ElementRef) {
   }





   // Get Indian StateWise Status Report list
   loadStateWiseDistData() {
    return this.restState.getStateWiseData().subscribe((data: any) => {
      console.log("StateWIse Dist Dataassssssssssss========= ", data);
      this.statesWiseDatas.push(data);
      console.log("CHECKING SAMPLE CHECKUP DATASSSSS", this.statesWiseDatas);

    });
  }

  getIndiaStatesData() {
    this.restState.getTotalStateData().subscribe((data: any) => {
      this.indiaTotal = data.statewise;
      console.log("Total State Datas Getting  ", data.statewise);
      // console.log("get Confirmed", data.statewise[0].confirmed);
      // console.log("get Active", data.statewise[0].active);
      // console.log("get Recoverd", data.statewise[0].recovered);
      // console.log("get Deaths", data.statewise[0].deaths);
      // console.log("get Lastupdated time", data.statewise[0].lastupdatedtime);
      console.log("get delta deaths time", data.statewise[0].deltadeaths);
      console.log("get Delta Recoverd Dta", data.statewise[0].deltarecovered);
      this.indiaTotalCOnfirmed = data.statewise[0].confirmed;
      this.indiaTotalDeaths = data.statewise[0].deaths;
      this.indiaTotalRecoverd = data.statewise[0].recovered;
      this.indiaTotalActive = data.statewise[0].active;
      this.lastUpdateTime = data.statewise[0].lastupdatedtime;


      for (let j = 1; j < data.statewise.length; j++) {
        this.stateList.push({states: data.statewise[j].state});
        }

    });
  }


  selectedStatesValues: any = [];
  stateName: string = "";

  selectedDistDatas: any = [];

  samp: any = [];
  getDropValues(e) {
    this.stateName = e;
    // console.log("INDIA TOTAL ====", this.indiaTotal);
    console.log("get drop values", e);
    this.selectedStatesValues = [];
    for (let j = 1; j < this.indiaTotal.length; j++) {
      // console.log("Get iterate valsss", this.indiaTotal[j].state + "index", j);
      // this.stateList.push({states: this.indiaTotal[j].state});
          if (e === this.indiaTotal[j].state) {
            this.selectedStatesValues.push({
              stateName: this.indiaTotal[j].state,
              confirmed: this.indiaTotal[j].confirmed,
              active: this.indiaTotal[j].active,
              deaths: this.indiaTotal[j].deaths,
              recoverd: this.indiaTotal[j].recovered,
              lastupdatedtime: this.indiaTotal[j].lastupdatedtime
            });
            break;
          }
      }
      console.log("Selected State Datasss", this.selectedStatesValues);


        console.log("lockDoen key datasssss", this.statesWiseDatas[0][e].districtData.Thrissur.confirmed);
        this.selectedDistDatas.push(this.statesWiseDatas[0][e]);

        console.log("Selected Dist Dtasss Getting Report", this.selectedDistDatas);


  }


   // lineChart1
   public lineChart1Data: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Series A'
    }
  ];
  public lineChart1Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart1Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: 40 - 5,
          max: 84 + 5,
        }
      }],
    },
    elements: {
      line: {
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart1Colours: Array<any> = [
    {
      backgroundColor: getStyle('--primary'),
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart1Legend = false;
  public lineChart1Type = 'line';

  // lineChart2
  public lineChart2Data: Array<any> = [
    {
      data: [1, 18, 9, 17, 34, 22, 11],
      label: 'Series A'
    }
  ];
  public lineChart2Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart2Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: 1 - 5,
          max: 34 + 5,
        }
      }],
    },
    elements: {
      line: {
        tension: 0.00001,
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart2Colours: Array<any> = [
    { // grey
      backgroundColor: getStyle('--info'),
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart2Legend = false;
  public lineChart2Type = 'line';


  // lineChart3
  public lineChart3Data: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: 'Series A'
    }
  ];
  public lineChart3Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart3Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart3Colours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
    }
  ];
  public lineChart3Legend = false;
  public lineChart3Type = 'line';


  // barChart1
  public barChart1Data: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40, 78, 81, 80, 45, 34, 12, 40, 12, 40],
      label: 'Series A',
      barPercentage: 0.6,
    }
  ];
  public barChart1Labels: Array<any> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
  public barChart1Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      display: false
    }
  };
  public barChart1Colours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.3)',
      borderWidth: 0
    }
  ];
  public barChart1Legend = false;
  public barChart1Type = 'bar';

  // mainChart

  public mainChartElements = 27;
  public mainChartData1: Array<number> = [];
  public mainChartData2: Array<number> = [];
  public mainChartData3: Array<number> = [];

  public mainChartData: Array<any> = [
    {
      data: this.mainChartData1,
      label: 'Current'
    },
    {
      data: this.mainChartData2,
      label: 'Previous'
    },
    {
      data: this.mainChartData3,
      label: 'BEP'
    }
  ];
  /* tslint:disable:max-line-length */
  public mainChartLabels: Array<any> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Thursday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  /* tslint:enable:max-line-length */
  public mainChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
      intersect: true,
      mode: 'index',
      position: 'nearest',
      callbacks: {
        labelColor: function(tooltipItem, chart) {
          return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor };
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function(value: any) {
            return value.charAt(0);
          }
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250
        }
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };
  public mainChartColours: Array<any> = [
    { // brandInfo
      backgroundColor: hexToRgba(getStyle('--info'), 10),
      borderColor: getStyle('--info'),
      pointHoverBackgroundColor: '#fff'
    },
    { // brandSuccess
      backgroundColor: 'transparent',
      borderColor: getStyle('--success'),
      pointHoverBackgroundColor: '#fff'
    },
    { // brandDanger
      backgroundColor: 'transparent',
      borderColor: getStyle('--danger'),
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5]
    }
  ];
  public mainChartLegend = false;
  public mainChartType = 'line';

  // social box charts

  public brandBoxChartData1: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Facebook'
    }
  ];
  public brandBoxChartData2: Array<any> = [
    {
      data: [1, 13, 9, 17, 34, 41, 38],
      label: 'Twitter'
    }
  ];
  public brandBoxChartData3: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: 'LinkedIn'
    }
  ];
  public brandBoxChartData4: Array<any> = [
    {
      data: [35, 23, 56, 22, 97, 23, 64],
      label: 'Google+'
    }
  ];

  public brandBoxChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public brandBoxChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false,
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };
  public brandBoxChartColours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.1)',
      borderColor: 'rgba(255,255,255,.55)',
      pointHoverBackgroundColor: '#fff'
    }
  ];
  public brandBoxChartLegend = false;
  public brandBoxChartType = 'line';

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  ngOnInit(): void {
    // generate random values for mainChart
    for (let i = 0; i <= this.mainChartElements; i++) {
      this.mainChartData1.push(this.random(50, 200));
      this.mainChartData2.push(this.random(80, 100));
      this.mainChartData3.push(65);
    }
    this.loadStateWiseDistData();
    this.getIndiaStatesData();
    }


    title = 'jspdf-autotable-demo';
    head = [['Total Confirmed', 'Total Recoverd', 'Total Death', 'Total Active']];


    download() {

    const data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
 // Few necessary setting options
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('MYPdf.pdf'); // Generated PDF
      });
      }
}
