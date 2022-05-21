import { Component, OnInit, Input } from '@angular/core';
import { Schedule } from '../../../../Schedule';
import { UiService } from 'src/app/services/ui.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { Observable, Subscription, of } from 'rxjs';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { TempSchedules } from 'TempSchedules';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {
  schedules: Schedule[]=[];
  //mockS: Schedule[]=[];
  tempSchedules: TempSchedules[]=[];
  public slots:string[] = this.uiService.getTimeSlots();
  public days:string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  subscription?: Subscription;
  public modelChanged: boolean = false; 
  subModelChanged?: Subscription; 
  faPlus = faPlus;
  // arr = new Array(7);
  // a1 = new Array(this.slots.length);         
  // a2 = new Array(this.slots.length); 

  constructor(private uiService:UiService, private scheduleService:ScheduleService) {       
    this.subModelChanged = this.uiService.onModelChanged().subscribe(b => this.modelChanged = b);    
  }

  ngOnInit(): void { 
    this.subscription = this.uiService.schedules.subscribe(s => this.schedules = s);
    this
  }

  cardClicked(schedule: Schedule, i: number): void {
    this.schedules.forEach((s, ii) => {      
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
  }

  onClick(s:Schedule, i:number): void {
    console.log('from scheduler!');
    this.uiService.setStartTime(i);
    this.uiService.setEndTime(i); 
    this.uiService.setWeekDay(s.weekDay);
    this.uiService.setWorkType(s.workType[i]);
  }
}
