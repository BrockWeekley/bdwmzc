import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Tab4Page } from './tab4.page';
import {BarChartModule, PieChartModule} from '@swimlane/ngx-charts';

const routes: Routes = [
  {
    path: '',
    component: Tab4Page
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        PieChartModule,
        BarChartModule
    ],
  declarations: [Tab4Page]
})
export class Tab4PageModule {}
