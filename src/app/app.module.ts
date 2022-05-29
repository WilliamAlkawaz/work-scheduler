import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from "@angular/router/testing";

import { AppComponent } from './app.component';
import { SchedulerComponent } from './components/scheduler/scheduler.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormScheduleComponent } from './components/form-schedule/form-schedule.component';
import { ButtonComponent } from './components/button/button.component';
import { CardComponent } from './components/card/card.component';
import { FormsModule } from '@angular/forms';
import { TestComponent } from './components/test/test.component';


@NgModule({
  declarations: [
    AppComponent,
    SchedulerComponent,
    FooterComponent,
    FormScheduleComponent,
    ButtonComponent,
    CardComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule, 
    HttpClientModule, 
    FormsModule, 
    BrowserAnimationsModule, 
    ToastrModule.forRoot(), 
    RouterTestingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
