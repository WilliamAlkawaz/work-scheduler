import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Schedule } from '../../../../Schedule';
import { UiService } from 'src/app/services/ui.service';
import { Observable, Subscription } from 'rxjs';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {

  public days:string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  subscription?: Subscription;
  public modelChanged: boolean = false; 
  subModelChanged?: Subscription; 
  faPlus = faPlus;

  @Input()
  schedules$:Observable<Schedule[]>;

  @Input()
  slots:string[];

  @Output('scheduleChanged')
  scheduleEmitter = new EventEmitter<{schedule:Schedule, i:number}>(); 

  constructor(private uiService:UiService) {       
  }

  ngOnInit(): void { 
  }

  // This function is called when the x is clicked in the schedule. 
  // This actually do not change the data in the database. 
  // It takes schedule and slot number (i) as arguements. 
  cardClicked(schedule: Schedule, i: number): void {
    console.log('cardClicked() was called inside the schedule component!');
    this.scheduleEmitter.emit({schedule, i});
  }

  // This function is called when "+ADD" is clicked. This button is displayed
  // only when a user hover over a certain slot. This function sets the start
  // time and the day in the form in the right. 
  onClick(s:Schedule, i:number): void {
    console.log('from scheduler!');
    this.uiService.setStartTime(i);
    this.uiService.setEndTime(i); 
    this.uiService.setWeekDay(s.weekDay);
    this.uiService.setWorkType(s.workType[i]);
  }
}
