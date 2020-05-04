import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { EmbedVideo } from 'ngx-embed-video';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    HttpClientModule,
    ButtonsModule.forRoot(),
    EmbedVideo.forRoot(),
    CarouselModule
  ],
  declarations: [ DashboardComponent ]
})
export class DashboardModule { }
