import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Schedule } from 'Schedule';
import { Observable, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-form-schedule',
  templateUrl: './form-schedule.component.html',
  styleUrls: ['./form-schedule.component.css']
})
export class FormScheduleComponent implements OnInit {
  
  days:string[];
  daysDictionary:{[id:string]:boolean;}={};
  weekDay:string="";
  public startTime:number=0;
  public endTime:number=0;
  public slots:string[]; 
  public workType:string = "";
  subsStart?: Subscription;
  subsEnd?: Subscription; 
  subsWeekDay?: Subscription;
  subsWorkType?: Subscription; 

  @Input()
  schedules:Schedule[];
  // schedules$:Observable<Schedule[]>;

  @Output('addClicked')
  addEmitter = new EventEmitter<Schedule>(); 

  constructor(private uiService:UiService, private scheduleService:ScheduleService) {
  }

  ngOnInit(): void {
    // this.scheduleService.getSchedules().subscribe(s => this.schedules = s); 
    this.days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.days.forEach(d => this.daysDictionary[d] = false);
    this.slots = this.scheduleService.getTimeSlots();
    this.subsStart = this.uiService.onStartTime().subscribe(n => this.startTime = n);
    this.subsEnd = this.uiService.onEndTime().subscribe(n => this.endTime = n); 
    this.subsWeekDay = this.uiService.onWeekDay().subscribe(s => {
      this.weekDay = s;
      this.daysDictionary[s] = true;
    });   
    
    this.subsWorkType = this.uiService.onWorkType().subscribe(s => this.workType = s);
  }

  reset(): void {
    this.days.forEach(d => this.daysDictionary[d] = false);
    this.startTime=0;
    this.endTime=0;
    this.workType="";
  }

  dayClicked(day)
  {
    console.log(day);
    this.daysDictionary[day] = !this.daysDictionary[day];
  }

  onSubmit(): void {
    console.log('add Clicked in form!');
    // this.scheduleService.getSchedules().subscribe(s => this.schedules = s); 

    this.days.forEach((d,dIndex) => {
      if(this.daysDictionary[d])
      {
        var num = 0;
        var flag = false; 
        var tmp = "";
        console.log(this.schedules[dIndex].assigned);
        if(this.schedules[dIndex].assigned[Number(this.startTime)])
        {
          var cc = 0; 
          while(this.schedules[dIndex].times[Number(this.startTime)-cc] == 0)
          {
            cc += 1; 
          }
          if(cc !== 0)
          {
            this.schedules[dIndex].times[Number(this.startTime)-cc] = cc; 
            tmp = this.schedules[dIndex].workType[Number(this.startTime)-cc]; 
          }        
        }
        let f = this.endTime - this.startTime; 
        var c = 0; 
        var c1 = 0; 
        for (var i=0; i<=f; i++)
        {
          if (c===0)
          {   
            if(this.schedules[dIndex].times[Number(this.startTime) + i] != 0)
            {
              num = this.schedules[dIndex].times[Number(this.startTime) + i];
              tmp = this.schedules[dIndex].workType[Number(this.startTime) + i];
              flag = true; 
            }
            if(flag)
            {          
              c1 += 1; 
            }
            this.schedules[dIndex].times[Number(this.startTime) + i] = f+1;
            this.schedules[dIndex].workType[Number(this.startTime) + i] = this.workType; 
            this.schedules[dIndex].assigned[Number(this.startTime) + i] = true; 
          }
          else
          {
            if(this.schedules[dIndex].times[Number(this.startTime) + i] != 0)
            {
              num = this.schedules[dIndex].times[Number(this.startTime) + i];
              tmp = this.schedules[dIndex].workType[Number(this.startTime) + i];
              flag = true; 
            }
            if(flag)
            {          
              c1 += 1; 
            }
            this.schedules[dIndex].times[Number(this.startTime) + i] = 0;
            this.schedules[dIndex].workType[Number(this.startTime) + i] = ""; 
            this.schedules[dIndex].assigned[Number(this.startTime) + i] = true; 
          }
          c += 1;         
        }
        if(flag)
        {
          if((num-c1) >= 0)
          {
            this.schedules[dIndex].times[Number(this.startTime) + i] = num-c1;
            this.schedules[dIndex].workType[Number(this.startTime) + i] = tmp;
          }        
        }   
        if(!flag && this.schedules[dIndex].assigned[Number(this.startTime) + c])
        {
          var c2 = 0; 
          while(this.schedules[dIndex].assigned[Number(this.startTime) + c + c2])
          {
            c2 += 1; 
          }
          this.schedules[dIndex].times[Number(this.startTime) + c] = c2; 
          this.schedules[dIndex].workType[Number(this.startTime) + c] = tmp; 
        }   
        this.addEmitter.emit(this.schedules[dIndex]);
      }
    });

    this.reset();   
  }
}
