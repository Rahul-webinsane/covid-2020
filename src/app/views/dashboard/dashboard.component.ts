import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

import { DomSanitizer } from '@angular/platform-browser';



import { EmbedVideoService } from 'ngx-embed-video';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  myInterval: number = 3000;
  youtubeUrl = 'https://www.youtube.com/watch?v=iHhcHTlGtRs';
  constructor(private embedService: EmbedVideoService) {
    console.log(this.embedService.embed(this.youtubeUrl));
 }


//  bingApiGet() {
//   console.log("BING DATA API", this.covidService.getBingWorldData());
// }

  ngOnInit(): void {
    // this.bingApiGet();
  }
}
