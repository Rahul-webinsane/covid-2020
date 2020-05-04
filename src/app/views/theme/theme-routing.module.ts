
import { IndiaStatusComponent } from './../covid/india-status/india-status.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColorsComponent } from './colors.component';
import { TypographyComponent } from './typography.component';
import { CovidMainPageComponent } from '../covid-main-page/covid-main-page.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Theme'
    },
    children: [
      {
        path: '',
        redirectTo: 'colors'
      },
      {
        path: 'covid-status',
        component: CovidMainPageComponent,
        data: {
          title: 'Covid Status'
        }
      },
      {
        path: 'india-status',
        component: IndiaStatusComponent,
        data: {
          title: 'India Status'
        }
      },
      {
        path: 'colors',
        component: ColorsComponent,
        data: {
          title: 'Colors'
        }
      },
      {
        path: 'typography',
        component: TypographyComponent,
        data: {
          title: 'Typography'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeRoutingModule {}
