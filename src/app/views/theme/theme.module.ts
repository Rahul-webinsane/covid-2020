
import { CarouselModule } from 'ngx-bootstrap/carousel';
// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ColorsComponent } from './colors.component';
import { TypographyComponent } from './typography.component';

// Theme Routing
import { ThemeRoutingModule } from './theme-routing.module';
import { CovidMainPageComponent } from '../covid-main-page/covid-main-page.component';

// design
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from '../buttons/buttons.module';
import { CovidService } from '../../covid-shared/covid.service';
import { HttpClientModule } from '@angular/common/http';
import { IndiaStatusComponent } from '../covid/india-status/india-status.component';

import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  imports: [
    CommonModule,
    ThemeRoutingModule,
    FormsModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule,
    HttpClientModule,
    ModalModule,
    CarouselModule
  ],
  declarations: [
    ColorsComponent,
    TypographyComponent,
    CovidMainPageComponent,
    IndiaStatusComponent
  ],
  providers: [CovidService]
})
export class ThemeModule { }
