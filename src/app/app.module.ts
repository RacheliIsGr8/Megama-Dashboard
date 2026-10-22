import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardHashvaatMoamadimModule } from './features/dashboard-hashvaat-moamadim/dashboard-hashvaat-moamadim.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DashboardHashvaatMoamadimModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
