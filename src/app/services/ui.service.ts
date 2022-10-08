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
  // schedules = new BehaviorSubject<Schedule[]>([]);
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
  private schedulesToUpdate:Schedule[]=[];

  constructor(private scheduleService: ScheduleService, private toastr:ToastrService) { 
    // scheduleService.getSchedules().subscribe(s => this.schedules.next(s));
  } 

  // This only updates the display. 
  addScheduleToUpdate(scheduleToUpdate:Schedule):void {    
    /*
    var tSchedules = this.schedules.getValue(); 
    tSchedules.forEach((s, ii) => {
      if(s.id == schedule.id)
      {
        tSchedules[ii] = schedule; 
      }
    });
    this.schedules.next(tSchedules);
    */
    console.log("addScheduleToUpdate called!")
    this.schedulesToUpdate.push(scheduleToUpdate);
    // Now the model has been changed so if modelChanged has not been set
    // set it now. 
    if(!this.modelChanged)
    {
      this.modelChanged = true;
      this.subject1.next(true); 
    }
  }

  // This is called when a new schedule is added from the form. 
  // We cannot call the function in the scheduleService from the form 
  // because this will not update the schedules displayed. 
  immUpdateSchedule(schedule:Schedule):void {
    this.scheduleService.updateSchedule(schedule).subscribe(); 
    //var tSchedules = this.schedules.getValue(); 
    //tSchedules.forEach((s, ii) => {
    //  if(s.id == schedule.id)
    //  {
    //    tSchedules[ii] = schedule; 
    //  }
    //});    
    //this.scheduleService.updateSchedule(schedule).subscribe(s => {
      //this.schedules.next(tSchedules);
      //this.toastr.success('Submitted successfully', 'Done!')
    //}); 
  }

  toCancel():void {
    this.schedulesToUpdate = [];
    this.modelChanged = false;
    this.subject1.next(false); 
    this.toastr.success('Cancelled successfully', 'Done!');
  }

  toSave():void {
    //var tSchedules = this.schedules.getValue(); 
    //tSchedules.forEach(s => {
    //  this.scheduleService.updateSchedule(s).subscribe(); 
    //});

    this.schedulesToUpdate.forEach(s => {
      this.scheduleService.updateSchedule(s).subscribe(); 
    })
    this.toastr.success('Saved successfully', 'Done!')
    this.modelChanged = false;
    this.subject1.next(false); 
  }

  // I don't know if I can subscribe to the observable (subject1) directly 
  // without this function. 
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
