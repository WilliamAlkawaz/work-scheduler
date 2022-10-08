import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Schedule } from 'Schedule';
import { Subscriber, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-form-schedule',
  templateUrl: './form-schedule.component.html',
  styleUrls: ['./form-schedule.component.css']
})
export class FormScheduleComponent implements OnInit {
  sun:boolean=false;
  mon:boolean=false;
  tue:boolean=false;
  wed:boolean=false;
  thu:boolean=false;
  fri:boolean=false;
  sat:boolean=false;
  weekDay:string="";
  public startTime:number=0;
  public endTime:number=0;
  public options:number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  public slots:string[] = this.scheduleService.getTimeSlots(); 
  public workType:string = "";
  subsStart?: Subscription;
  subsEnd?: Subscription; 
  subsWeekDay?: Subscription;
  subsWorkType?: Subscription; 

  @Input()
  schedules:Schedule[];

  @Output('addClicked')
  addEmitter = new EventEmitter<Schedule>(); 

  constructor(private uiService:UiService, private scheduleService:ScheduleService) {
    // scheduleService.getSchedules().subscribe(s => this.schedules = s);
    this.subsStart = this.uiService.onStartTime().subscribe(n => this.startTime = n);
    this.subsEnd = this.uiService.onEndTime().subscribe(n => this.endTime = n); 
    this.subsWeekDay = this.uiService.onWeekDay().subscribe(s => this.weekDay = s);
    this.subsWorkType = this.uiService.onWorkType().subscribe(s => {
      this.workType = s;
      switch(this.weekDay) {
        case "Sun": {
          this.sun = true;
          this.mon = false;
          this.tue = false; 
          this.wed = false; 
          this.thu = false; 
          this.fri = false; 
          this.sat = false; 
          break; 
        }
        case "Mon": {
          this.sun = false; 
          this.mon = true; 
          this.tue = false; 
          this.wed = false; 
          this.thu = false; 
          this.fri = false; 
          this.sat = false; 
          break; 
        }
        case "Tue": {
          this.sun = false; 
          this.mon = false; 
          this.tue = true; 
          this.wed = false; 
          this.thu = false; 
          this.fri = false; 
          this.sat = false;
          break; 
        }
        case "Wed": {
          this.sun = false; 
          this.mon = false; 
          this.tue = false; 
          this.wed = true; 
          this.thu = false; 
          this.fri = false; 
          this.sat = false;
          break; 
        }
        case "Thu": {
          this.sun = false; 
          this.mon = false; 
          this.tue = false; 
          this.wed = false; 
          this.thu = true; 
          this.fri = false; 
          this.sat = false;
          break; 
        }
        case "Fri": {
          this.sun = false; 
          this.mon = false; 
          this.tue = false; 
          this.wed = false; 
          this.thu = false; 
          this.fri = true; 
          this.sat = false;
          break; 
        }
        case "Sat": {
          this.sun = false; 
          this.mon = false; 
          this.tue = false; 
          this.wed = false; 
          this.thu = false; 
          this.fri = false; 
          this.sat = true;
          break; 
        }
        default: {
          break; 
        }
      }
    });
  }

  ngOnInit(): void {
  }

  reset(): void {
    this.sun=false;
    this.mon=false;
    this.tue=false;
    this.wed=false;
    this.thu=false;
    this.fri=false;
    this.sat=false;
    this.startTime=0;
    this.endTime=0;
    this.workType="";
  }

  sunClicked(): void {
    this.sun = !this.sun;
  }

  monClicked(): void {
    this.mon = !this.mon;
  }

  tueClicked(): void {
    this.tue = !this.tue;
  }

  wedClicked(): void {
    this.wed = !this.wed;
  }

  thuClicked(): void {
    this.thu = !this.thu;
  }

  friClicked(): void {
    this.fri = !this.fri;
  }

  satClicked(): void {
    this.sat = !this.sat;
  }

  resetForm(form:NgForm): void {
    form.form.reset();
  }

  onSubmit(): void {
    console.log('add Clicked in form!');

    if(this.sun)
    {
      var num = 0;
      var flag = false; 
      var tmp = "";
      if(this.schedules[0].assigned[Number(this.startTime)])
      {
        var cc = 0; 
        while(this.schedules[0].times[Number(this.startTime)-cc] == 0)
        {
          cc += 1; 
        }
        if(cc !== 0)
        {
          this.schedules[0].times[Number(this.startTime)-cc] = cc; 
          tmp = this.schedules[0].workType[Number(this.startTime)-cc]; 
        }        
      }
      let f = this.endTime - this.startTime; 
      var c = 0; 
      var c1 = 0; 
      for (var i=0; i<=f; i++)
      {
        if (c===0)
        {   
          if(this.schedules[0].times[Number(this.startTime) + i] != 0)
          {
            num = this.schedules[0].times[Number(this.startTime) + i];
            tmp = this.schedules[0].workType[Number(this.startTime) + i];
            flag = true; 
          }
          if(flag)
          {          
            c1 += 1; 
          }
          this.schedules[0].times[Number(this.startTime) + i] = f+1;
          this.schedules[0].workType[Number(this.startTime) + i] = this.workType; 
          this.schedules[0].assigned[Number(this.startTime) + i] = true; 
        }
        else
        {
          if(this.schedules[0].times[Number(this.startTime) + i] != 0)
          {
            num = this.schedules[0].times[Number(this.startTime) + i];
            tmp = this.schedules[0].workType[Number(this.startTime) + i];
            flag = true; 
          }
          if(flag)
          {          
            c1 += 1; 
          }
          this.schedules[0].times[Number(this.startTime) + i] = 0;
          this.schedules[0].workType[Number(this.startTime) + i] = ""; 
          this.schedules[0].assigned[Number(this.startTime) + i] = true; 
        }
        c += 1;         
      }
      if(flag)
      {
        if((num-c1) >= 0)
        {
          this.schedules[0].times[Number(this.startTime) + i] = num-c1;
          this.schedules[0].workType[Number(this.startTime) + i] = tmp;
        }        
      }   
      if(!flag && this.schedules[0].assigned[Number(this.startTime) + c])
      {
        var c2 = 0; 
        while(this.schedules[0].assigned[Number(this.startTime) + c + c2])
        {
          c2 += 1; 
        }
        this.schedules[0].times[Number(this.startTime) + c] = c2; 
        this.schedules[0].workType[Number(this.startTime) + c] = tmp; 
      }   
      this.addEmitter.emit(this.schedules[0]);
    }    
    if(this.mon)
    {
      var num = 0;
      var flag = false; 
      var tmp = "";
      if(this.schedules[1].assigned[Number(this.startTime)])
      {
        var cc = 0; 
        while(this.schedules[1].times[Number(this.startTime)-cc] == 0)
        {
          cc += 1; 
        }
        if(cc !== 0)
        {
          this.schedules[1].times[Number(this.startTime)-cc] = cc; 
          tmp = this.schedules[1].workType[Number(this.startTime)-cc]; 
        }        
      }
      let f = this.endTime - this.startTime; 
      var c = 0; 
      var c1 = 0; 
      for (var i=0; i<=f; i++)
      {
        if (c===0)
        {   
          if(this.schedules[1].times[Number(this.startTime) + i] != 0)
          {
            num = this.schedules[1].times[Number(this.startTime) + i];
            tmp = this.schedules[1].workType[Number(this.startTime) + i];
            flag = true; 
          }
          if(flag)
          {          
            c1 += 1; 
          }
          this.schedules[1].times[Number(this.startTime) + i] = f+1;
          this.schedules[1].workType[Number(this.startTime) + i] = this.workType; 
          this.schedules[1].assigned[Number(this.startTime) + i] = true; 
        }
        else
        {
          if(this.schedules[1].times[Number(this.startTime) + i] != 0)
          {
            num = this.schedules[1].times[Number(this.startTime) + i];
            tmp = this.schedules[1].workType[Number(this.startTime) + i];
            flag = true; 
          }
          if(flag)
          {          
            c1 += 1; 
          }
          this.schedules[1].times[Number(this.startTime) + i] = 0;
          this.schedules[1].workType[Number(this.startTime) + i] = ""; 
          this.schedules[1].assigned[Number(this.startTime) + i] = true; 
        }
        c += 1;         
      }
      if(flag)
      {
        if((num-c1) >= 0)
        {
          this.schedules[1].times[Number(this.startTime) + i] = num-c1;
          this.schedules[1].workType[Number(this.startTime) + i] = tmp;
        }        
      }   
      if(!flag && this.schedules[1].assigned[Number(this.startTime) + c])
      {
        var c2 = 0; 
        while(this.schedules[1].assigned[Number(this.startTime) + c + c2])
        {
          c2 += 1; 
        }
        this.schedules[1].times[Number(this.startTime) + c] = c2; 
        this.schedules[1].workType[Number(this.startTime) + c] = tmp; 
      }   
      this.addEmitter.emit(this.schedules[1]);
    }    
    if(this.tue)
    {
      var num = 0;
      var flag = false; 
      var tmp = "";
      if(this.schedules[2].assigned[Number(this.startTime)])
      {
        var cc = 0; 
        while(this.schedules[2].times[Number(this.startTime)-cc] == 0)
        {
          cc += 1; 
        }
        if(cc !== 0)
        {
          this.schedules[2].times[Number(this.startTime)-cc] = cc; 
          tmp = this.schedules[2].workType[Number(this.startTime)-cc]; 
        }        
      }
      let f = this.endTime - this.startTime; 
      var c = 0; 
      var c1 = 0; 
      for (var i=0; i<=f; i++)
      {
        if (c===0)
        {   
          if(this.schedules[2].times[Number(this.startTime) + i] != 0)
          {
            num = this.schedules[2].times[Number(this.startTime) + i];
            tmp = this.schedules[2].workType[Number(this.startTime) + i];
            flag = true; 
          }
          if(flag)
          {          
            c1 += 1; 
          }
          this.schedules[2].times[Number(this.startTime) + i] = f+1;
          this.schedules[2].workType[Number(this.startTime) + i] = this.workType; 
          this.schedules[2].assigned[Number(this.startTime) + i] = true; 
        }
        else
        {
          if(this.schedules[2].times[Number(this.startTime) + i] != 0)
          {
            num = this.schedules[2].times[Number(this.startTime) + i];
            tmp = this.schedules[2].workType[Number(this.startTime) + i];
            flag = true; 
          }
          if(flag)
          {          
            c1 += 1; 
          }
          this.schedules[2].times[Number(this.startTime) + i] = 0;
          this.schedules[2].workType[Number(this.startTime) + i] = ""; 
          this.schedules[2].assigned[Number(this.startTime) + i] = true; 
        }
        c += 1;         
      }
      if(flag)
      {
        if((num-c1) >= 0)
        {
          this.schedules[2].times[Number(this.startTime) + i] = num-c1;
          this.schedules[2].workType[Number(this.startTime) + i] = tmp;
        }        
      }   
      if(!flag && this.schedules[2].assigned[Number(this.startTime) + c])
      {
        var c2 = 0; 
        while(this.schedules[2].assigned[Number(this.startTime) + c + c2])
        {
          c2 += 1; 
        }
        this.schedules[2].times[Number(this.startTime) + c] = c2; 
        this.schedules[2].workType[Number(this.startTime) + c] = tmp; 
      }   
      this.addEmitter.emit(this.schedules[2]);
    }    
    if(this.wed)
    {
      var num = 0;
      var flag = false; 
      var tmp = "";
      if(this.schedules[3].assigned[Number(this.startTime)])
      {
        var cc = 0; 
        while(this.schedules[3].times[Number(this.startTime)-cc] == 0)
        {
          cc += 1; 
        }
        if(cc !== 0)
        {
          this.schedules[3].times[Number(this.startTime)-cc] = cc; 
          tmp = this.schedules[3].workType[Number(this.startTime)-cc]; 
        }        
      }
      let f = this.endTime - this.startTime; 
      var c = 0; 
      var c1 = 0; 
      for (var i=0; i<=f; i++)
      {
        if (c===0)
        {   
          if(this.schedules[3].times[Number(this.startTime) + i] != 0)
          {
            num = this.schedules[3].times[Number(this.startTime) + i];
            tmp = this.schedules[3].workType[Number(this.startTime) + i];
            flag = true; 
          }
          if(flag)
          {          
            c1 += 1; 
          }
          this.schedules[3].times[Number(this.startTime) + i] = f+1;
          this.schedules[3].workType[Number(this.startTime) + i] = this.workType; 
          this.schedules[3].assigned[Number(this.startTime) + i] = true; 
        }
        else
        {
          if(this.schedules[3].times[Number(this.startTime) + i] != 0)
          {
            num = this.schedules[3].times[Number(this.startTime) + i];
            tmp = this.schedules[3].workType[Number(this.startTime) + i];
            flag = true; 
          }
          if(flag)
          {          
            c1 += 1; 
          }
          this.schedules[3].times[Number(this.startTime) + i] = 0;
          this.schedules[3].workType[Number(this.startTime) + i] = ""; 
          this.schedules[3].assigned[Number(this.startTime) + i] = true; 
        }
        c += 1;         
      }
      if(flag)
      {
        if((num-c1) >= 0)
        {
          this.schedules[3].times[Number(this.startTime) + i] = num-c1;
          this.schedules[3].workType[Number(this.startTime) + i] = tmp;
        }        
      }   
      if(!flag && this.schedules[3].assigned[Number(this.startTime) + c])
      {
        var c2 = 0; 
        while(this.schedules[3].assigned[Number(this.startTime) + c + c2])
        {
          c2 += 1; 
        }
        this.schedules[3].times[Number(this.startTime) + c] = c2; 
        this.schedules[3].workType[Number(this.startTime) + c] = tmp; 
      }   
      this.addEmitter.emit(this.schedules[3]);
    }    
    if(this.thu)
    {
      var num = 0;
      var flag = false; 
      var tmp = "";
      if(this.schedules[4].assigned[Number(this.startTime)])
      {
        var cc = 0; 
        while(this.schedules[4].times[Number(this.startTime)-cc] == 0)
        {
          cc += 1; 
        }
        if(cc !== 0)
        {
          this.schedules[4].times[Number(this.startTime)-cc] = cc; 
          tmp = this.schedules[4].workType[Number(this.startTime)-cc]; 
        }        
      }
      let f = this.endTime - this.startTime; 
      var c = 0; 
      var c1 = 0; 
      for (var i=0; i<=f; i++)
      {
        if (c===0)
        {   
          if(this.schedules[4].times[Number(this.startTime) + i] != 0)
          {
            num = this.schedules[4].times[Number(this.startTime) + i];
            tmp = this.schedules[4].workType[Number(this.startTime) + i];
            flag = true; 
          }
          if(flag)
          {          
            c1 += 1; 
          }
          this.schedules[4].times[Number(this.startTime) + i] = f+1;
          this.schedules[4].workType[Number(this.startTime) + i] = this.workType; 
          this.schedules[4].assigned[Number(this.startTime) + i] = true; 
        }
        else
        {
          if(this.schedules[4].times[Number(this.startTime) + i] != 0)
          {
            num = this.schedules[4].times[Number(this.startTime) + i];
            tmp = this.schedules[4].workType[Number(this.startTime) + i];
            flag = true; 
          }
          if(flag)
          {          
            c1 += 1; 
          }
          this.schedules[4].times[Number(this.startTime) + i] = 0;
          this.schedules[4].workType[Number(this.startTime) + i] = ""; 
          this.schedules[4].assigned[Number(this.startTime) + i] = true; 
        }
        c += 1;         
      }
      if(flag)
      {
        if((num-c1) >= 0)
        {
          this.schedules[4].times[Number(this.startTime) + i] = num-c1;
          this.schedules[4].workType[Number(this.startTime) + i] = tmp;
        }        
      }   
      if(!flag && this.schedules[4].assigned[Number(this.startTime) + c])
      {
        var c2 = 0; 
        while(this.schedules[4].assigned[Number(this.startTime) + c + c2])
        {
          c2 += 1; 
        }
        this.schedules[4].times[Number(this.startTime) + c] = c2; 
        this.schedules[4].workType[Number(this.startTime) + c] = tmp; 
      }   
      this.addEmitter.emit(this.schedules[4]);
    }    
    if(this.fri)
    {
      var num = 0;
      var flag = false; 
      var tmp = "";
      if(this.schedules[5].assigned[Number(this.startTime)])
      {
        var cc = 0; 
        while(this.schedules[5].times[Number(this.startTime)-cc] == 0)
        {
          cc += 1; 
        }
        if(cc !== 0)
        {
          this.schedules[5].times[Number(this.startTime)-cc] = cc; 
          tmp = this.schedules[5].workType[Number(this.startTime)-cc]; 
        }        
      }
      let f = this.endTime - this.startTime; 
      var c = 0; 
      var c1 = 0; 
      for (var i=0; i<=f; i++)
      {
        if (c===0)
        {   
          if(this.schedules[5].times[Number(this.startTime) + i] != 0)
          {
            num = this.schedules[5].times[Number(this.startTime) + i];
            tmp = this.schedules[5].workType[Number(this.startTime) + i];
            flag = true; 
          }
          if(flag)
          {          
            c1 += 1; 
          }
          this.schedules[5].times[Number(this.startTime) + i] = f+1;
          this.schedules[5].workType[Number(this.startTime) + i] = this.workType; 
          this.schedules[5].assigned[Number(this.startTime) + i] = true; 
        }
        else
        {
          if(this.schedules[5].times[Number(this.startTime) + i] != 0)
          {
            num = this.schedules[5].times[Number(this.startTime) + i];
            tmp = this.schedules[5].workType[Number(this.startTime) + i];
            flag = true; 
          }
          if(flag)
          {          
            c1 += 1; 
          }
          this.schedules[5].times[Number(this.startTime) + i] = 0;
          this.schedules[5].workType[Number(this.startTime) + i] = ""; 
          this.schedules[5].assigned[Number(this.startTime) + i] = true; 
        }
        c += 1;         
      }
      if(flag)
      {
        if((num-c1) >= 0)
        {
          this.schedules[5].times[Number(this.startTime) + i] = num-c1;
          this.schedules[5].workType[Number(this.startTime) + i] = tmp;
        }        
      }   
      if(!flag && this.schedules[5].assigned[Number(this.startTime) + c])
      {
        var c2 = 0; 
        while(this.schedules[5].assigned[Number(this.startTime) + c + c2])
        {
          c2 += 1; 
        }
        this.schedules[5].times[Number(this.startTime) + c] = c2; 
        this.schedules[5].workType[Number(this.startTime) + c] = tmp; 
      }   
      this.addEmitter.emit(this.schedules[5]);
    }    
    if(this.sat)
    {
      var num = 0;
      var flag = false; 
      var tmp = "";
      if(this.schedules[6].assigned[Number(this.startTime)])
      {
        var cc = 0; 
        while(this.schedules[6].times[Number(this.startTime)-cc] == 0)
        {
          cc += 1; 
        }
        if(cc !== 0)
        {
          this.schedules[6].times[Number(this.startTime)-cc] = cc; 
          tmp = this.schedules[6].workType[Number(this.startTime)-cc]; 
        }        
      }
      let f = this.endTime - this.startTime; 
      var c = 0; 
      var c1 = 0; 
      for (var i=0; i<=f; i++)
      {
        if (c===0)
        {   
          if(this.schedules[6].times[Number(this.startTime) + i] != 0)
          {
            num = this.schedules[6].times[Number(this.startTime) + i];
            tmp = this.schedules[6].workType[Number(this.startTime) + i];
            flag = true; 
          }
          if(flag)
          {          
            c1 += 1; 
          }
          this.schedules[6].times[Number(this.startTime) + i] = f+1;
          this.schedules[6].workType[Number(this.startTime) + i] = this.workType; 
          this.schedules[6].assigned[Number(this.startTime) + i] = true; 
        }
        else
        {
          if(this.schedules[6].times[Number(this.startTime) + i] != 0)
          {
            num = this.schedules[6].times[Number(this.startTime) + i];
            tmp = this.schedules[6].workType[Number(this.startTime) + i];
            flag = true; 
          }
          if(flag)
          {          
            c1 += 1; 
          }
          this.schedules[6].times[Number(this.startTime) + i] = 0;
          this.schedules[6].workType[Number(this.startTime) + i] = ""; 
          this.schedules[6].assigned[Number(this.startTime) + i] = true; 
        }
        c += 1;         
      }
      if(flag)
      {
        if((num-c1) >= 0)
        {
          this.schedules[6].times[Number(this.startTime) + i] = num-c1;
          this.schedules[6].workType[Number(this.startTime) + i] = tmp;
        }        
      }   
      if(!flag && this.schedules[6].assigned[Number(this.startTime) + c])
      {
        var c2 = 0; 
        while(this.schedules[6].assigned[Number(this.startTime) + c + c2])
        {
          c2 += 1; 
        }
        this.schedules[6].times[Number(this.startTime) + c] = c2; 
        this.schedules[6].workType[Number(this.startTime) + c] = tmp; 
      }   
      this.addEmitter.emit(this.schedules[6]);
    }  
    this.reset();   
  }
}
