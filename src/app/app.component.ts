import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from 'Schedule';
import { ScheduleService } from './services/schedule.service';
import { UiService } from './services/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  schedules$:Observable<Schedule[]>;
  slots:string[];
  schedule:Schedule;
  title = 'work-scheduler';
  constructor(private scheduleService:ScheduleService, private uiService:UiService) {  
  }  
  
  ngOnInit(): void { 
    this.schedules$ = this.scheduleService.getSchedules();
    this.slots = this.scheduleService.getTimeSlots(); 
  }

  scheduleChanged({schedule: Schedule, i: number}): void {
    console.log('scheduleChanged() was called inside app component!');
    var schedule = {schedule: Schedule, i: number}.schedule;
    let i = {schedule: Schedule, i: number}.i;
    let length = schedule.times[i] + i; 
    
    for(var j=i; j<length; j++)
    {
      schedule.times[j] = 0;
      schedule.workType[j] = "";
      schedule.assigned[j] = false;
    }    
    
    this.uiService.addScheduleToUpdate(schedule);
    /*
    this.schedules$.forEach((s:Schedule[]) => {      
      if(s.id == schedule.id)
      {
        var nn = s.times[i] + i;
        for(var j=i; j<nn; j++)
        {
          this.schedules$[ii].times[j] = 0;
          this.schedules$[ii].workType[j] = "";
          this.schedules$[ii].assigned[j] = false;
        }    
        this.uiService.updateSchedule(this.schedules$[ii]);      
      }
    });
    */
  }

  addSchedule(schedule:Schedule) {
    console.log('Cancel clicked in app! id is: ' + schedule.id + 'and times is: ' + schedule.times);
    this.scheduleService.updateSchedule(schedule); 
    this.schedules$ = this.scheduleService.getSchedules();
  }

  saveClicked() {
    console.log('Cancel clicked in app!');
    this.uiService.toSave(); 
    this.schedules$ = this.scheduleService.getSchedules();
  }

  cancelClicked() {
    console.log('Cancel clicked in app!');
    this.schedules$ = this.scheduleService.getSchedules();
    this.uiService.toCancel(); 
  }
}
