import { Component } from '@angular/core';
//import { SchedulerComponent } from '../components/form-schedule'; 
import { ScheduleService } from './services/schedule.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'work-scheduler';
  constructor() {  
  }   
}
