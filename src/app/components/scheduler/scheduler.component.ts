import { Component, OnInit, Input } from '@angular/core';
import { Schedule } from '../../../../Schedule';
import { UiService } from 'src/app/services/ui.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { Subscription } from 'rxjs';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {
  schedules: Schedule[]=[];
  //mockS: Schedule[]=[];
  public slots:string[] = ["08:00-08:30", "08:30-09:00", "09:00-09:30", "09:30-10:00", "10:00-10:30", "10:30-11:00", 
  "11:00-11:30", "11:30-12:00", "12:00-12:30", "12:30-13:00", "13:00-13:30", "13:30-14:00",  
  "14:00-14:30", "14:30-15:00", "15:00-15:30", "15:30-16:00", "16:00-16:30", "16:30-17:00" ];
  subscription?: Subscription;
  public modelChanged: boolean = false; 
  subModelChanged?: Subscription; 
  faPlus = faPlus;

  constructor(private uiService:UiService, private scheduleService:ScheduleService) {         
    //this.scheduleService.getSchedules().subscribe(s => this.schedules = s);
    this.subscription = this.uiService.getSchedules().subscribe(s => this.schedules = s);
    this.subModelChanged = this.uiService.onModelChanged().subscribe(b => this.modelChanged = b);
  }

  ngOnInit(): void {
    //this.uiService.onSchedulesChanged().subscribe(s => this.schedules = s);
    this.subscription = this.uiService.getSchedules().subscribe(s => this.schedules = s);
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
