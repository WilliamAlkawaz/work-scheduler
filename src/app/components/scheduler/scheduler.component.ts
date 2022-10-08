import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Schedule } from '../../../../Schedule';
import { UiService } from 'src/app/services/ui.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { Observable, Subscription, of } from 'rxjs';
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
  // It updates the schedules array in this template and also the one 
  // in the uiService. This actually do not change the data in the database. 
  // It takes schedule and slot number (i) as arguements. 
  cardClicked(schedule: Schedule, i: number): void {
    console.log('cardClicked() was called inside the schedule component!');
    this.scheduleEmitter.emit({schedule, i});
    /*
    this.schedules$.forEach((s, ii) => {      
      if(s.id == schedule.id)
      {
        var nn = s.times[i] + i;
        for(var j=i; j<nn; j++)
        {
          this.schedules[ii].times[j] = 0;
          this.schedules[ii].workType[j] = "";
          this.schedules[ii].assigned[j] = false;
        }    
        this.uiService.updateSchedule(this.schedules[ii]);      
      }
    });
    */
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
