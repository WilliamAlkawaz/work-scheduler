import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from 'Schedule';
import { ScheduleService } from './services/schedule.service';
import { UiService } from './services/ui.service';
import { ToastrService } from 'ngx-toastr';

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
  private schedulesToUpdate:Schedule[]=[];
  private originalSchdules:Schedule[]=[];

  constructor(private scheduleService:ScheduleService, 
    private uiService:UiService, private toastr:ToastrService) {  
  }  
  
  ngOnInit(): void { 
    this.schedules$ = this.scheduleService.getSchedules();
    this.slots = this.scheduleService.getTimeSlots(); 
  }

  scheduleChanged({schedule: Schedule, i: number}): void {    
    console.log('scheduleChanged() was called inside app component!');
    this.originalSchdules.push({schedule: Schedule, i: number}.schedule);
    var schedule = {schedule: Schedule, i: number}.schedule;

    let i = {schedule: Schedule, i: number}.i;    
    let length = schedule.times[i] + i; 
    
    for(var j=i; j<length; j++)
    {
      schedule.times[j] = 0;
      schedule.workType[j] = "";
      schedule.assigned[j] = false;
    }    
    this.schedulesToUpdate.push(schedule);
    this.uiService.scheduleChanged();
  }

  addSchedule(schedule:Schedule) {
    console.log('Cancel clicked in app! id is: ' + schedule.id + 'and times is: ' + schedule.times);
    this.scheduleService.updateSchedule(schedule).subscribe(); 
    this.schedules$ = this.scheduleService.getSchedules();
    this.toastr.success('Schedule added successfully', 'Done!');
  }

  saveClicked() {
    console.log('Cancel clicked in app!');
    this.schedulesToUpdate.forEach(s => {
      this.scheduleService.updateSchedule(s).subscribe(() => {
        this.schedules$ = this.scheduleService.getSchedules();
        this.schedulesToUpdate = [];
        this.uiService.toSave(); this.toastr.success('Saved successfully', 'Done!');
      }); 
    }); 
  }

  cancelClicked() {
    console.log('Cancel clicked in app!');
    this.schedulesToUpdate = [];
    this.uiService.toCancel();     
    this.schedules$ = this.scheduleService.getSchedules();    
    this.toastr.success('Cancelled successfully', 'Done!');
  }
}
