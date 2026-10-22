import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { DashboardHashvaatMoamadimComponent } from './dashboard-hashvaat-moamadim.component';
import { BchiratMoamadimComponent } from './bchirat-moamadim/bchirat-moamadim.component';
import { HashvaatMoamadimComponent } from './hashvaat-moamadim/hashvaat-moamadim.component';
import { DafMoamadComponent } from './daf-moamad/daf-moamad.component';
import { MasachBdikatRechivimComponent } from './masach-bdikat-rechivim/masach-bdikat-rechivim.component';

import { PakadIturMegamaComponent } from './shared/pakad-itur-megama/pakad-itur-megama.component';
import { NivchruLeHashvaaComponent } from './shared/nivchru-le-hashvaa/nivchru-le-hashvaa.component';
import { ShuratMoamadComponent } from './shared/shurat-moamad/shurat-moamad.component';
import { LineChartComponent } from './shared/line-chart/line-chart.component';
import { ColumnChartComponent } from './shared/column-chart/column-chart.component';
import { TableComponent } from './shared/table/table.component';
import { AccordionComponent } from './shared/accordion/accordion.component';
import { AccordionReshimaAmudotComponent } from './shared/accordion-reshima-amudot/accordion-reshima-amudot.component';
import { AccordionEzorHashvaaComponent } from './shared/accordion-ezor-hashvaa/accordion-ezor-hashvaa.component';
import { DataCubeComponent } from './shared/data-cube/data-cube.component';
import { MoamdDataHeaderComponent } from './shared/moamd-data-header/moamd-data-header.component';
import { InputSelectComponent } from './shared/input-select/input-select.component';
import { TziyunimMoamadComponent } from './shared/tziyunim-moamad/tziyunim-moamad.component';
import { TmunatMoamadComponent } from './shared/tmunat-moamad/tmunat-moamad.component';
import { StepperComponent } from './shared/stepper/stepper.component';

@NgModule({
  declarations: [
    DashboardHashvaatMoamadimComponent,
    MasachBdikatRechivimComponent,
    BchiratMoamadimComponent,
    HashvaatMoamadimComponent,
    DafMoamadComponent,
    PakadIturMegamaComponent,
    NivchruLeHashvaaComponent,
    ShuratMoamadComponent,
    LineChartComponent,
    ColumnChartComponent,
    TableComponent,
    AccordionComponent,
    AccordionReshimaAmudotComponent,
    AccordionEzorHashvaaComponent,
    DataCubeComponent,
    MoamdDataHeaderComponent,
    InputSelectComponent,
    TziyunimMoamadComponent,
    TmunatMoamadComponent,
    StepperComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    DragDropModule
  ],
  exports: [
    DashboardHashvaatMoamadimComponent
  ]
})
export class DashboardHashvaatMoamadimModule {
}
