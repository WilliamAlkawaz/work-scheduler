import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  // schedules = new BehaviorSubject<Schedule[]>([]);
  public modelChanged:boolean = false; 
  private subject1 = new Subject<any>();   
  private startTime = 0; 
  private startSub = new Subject<any>(); 
  private endTime = 0; 
  private endSub = new Subject<any>(); ;
  private weekDay = ""; 
  private weekDaySub = new Subject<any>(); 
  private workType = ""; 
  private workTypeSub = new Subject<any>(); 

  // This only updates the display. 
  scheduleChanged():void {    
    console.log("addScheduleToUpdate called!")

    // Now the model has been changed so if modelChanged has not been set
    // set it now. 
    if(!this.modelChanged)
    {
      this.modelChanged = true;
      this.subject1.next(true); 
    }
  }
  
  toSave():void {
    this.modelChanged = false;
    this.subject1.next(false); 
  }

  toCancel():void {    
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
