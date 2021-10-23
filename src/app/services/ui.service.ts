import { Injectable } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';
import { ScheduleService } from './schedule.service';
import { Schedule } from 'Schedule';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  schedules = new BehaviorSubject<Schedule[]>([]);
  
  //private schedules:Schedule[] = [];
  //private mockS:Schedule[] = [];
  private modelChanged:boolean = false; 
  private subject1 = new Subject<any>();   
  private startTime = 0; 
  private startSub = new Subject<any>(); 
  private endTime = 0; 
  private endSub = new Subject<any>(); ;
  private weekDay = ""; 
  private weekDaySub = new Subject<any>(); 
  private workType = ""; 
  private workTypeSub = new Subject<any>(); 

  constructor(private scheduleService: ScheduleService, private toastr:ToastrService) { 
    scheduleService.getSchedules().subscribe(s => this.schedules.next(s));
  }
  
  getSchedules(): Observable<Schedule[]> {
    return this.schedules.asObservable(); //returns observable which is then used by the component
  }  

  updateSchedule(schedule:Schedule):void {
    if(!this.modelChanged)
    {
      this.modelChanged = true;
      this.subject1.next(this.modelChanged); 
    }
    var tSchedules = this.schedules.getValue(); 
    tSchedules.forEach((s, ii) => {
      if(s.id == schedule.id)
      {
        tSchedules[ii] = schedule; 
      }
    });
    this.schedules.next(tSchedules);
  }

  immUpdateSchedule(schedule:Schedule):void {
    var tSchedules = this.schedules.getValue(); 
    tSchedules.forEach((s, ii) => {
      if(s.id == schedule.id)
      {
        tSchedules[ii] = schedule; 
      }
    });
    this.schedules.next(tSchedules);
    this.scheduleService.updateSchedule(schedule).subscribe(s => this.toastr.success('Submitted successfully', 'Done!')); 
  }

  toCancel():void {
    this.scheduleService.getSchedules().subscribe(s => {
      this.schedules.next(s);
      this.toastr.success('Cancelled successfully', 'Done!')
    });
    this.modelChanged = false;
    this.subject1.next(this.modelChanged); 
  }

  toSave():void {
    var tSchedules = this.schedules.getValue(); 
    tSchedules.forEach(s => {
      this.scheduleService.updateSchedule(s).subscribe(); 
    });
    this.toastr.success('Saved successfully', 'Done!')
    this.modelChanged = false;
    this.subject1.next(this.modelChanged); 
  }

  onModelChanged():Observable<any> {
    return this.subject1.asObservable(); 
  }

  onStartTime():Observable<any> {
    return this.startSub.asObservable(); 
  }

  setStartTime(n:number): void {
    this.startTime = n; 
    this.startSub.next(this.startTime); 
  }
  
  onEndTime():Observable<any> {
    return this.endSub.asObservable(); 
  }

  setEndTime(n:number): void {
    this.endTime = n; 
    this.endSub.next(this.endTime); 
  }

  onWeekDay():Observable<any> {
    return this.weekDaySub.asObservable(); 
  }

  setWeekDay(s:string): void {    
    this.weekDay = s; 
    this.weekDaySub.next(this.weekDay); 
  }
  
  onWorkType():Observable<any> {
    return this.workTypeSub.asObservable();
  }

  setWorkType(s:string): void {
    this.workType = s; 
    this.workTypeSub.next(this.workType);
  }
}
