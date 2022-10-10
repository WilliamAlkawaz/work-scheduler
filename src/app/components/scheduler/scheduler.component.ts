import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Schedule } from '../../../../Schedule';
import { UiService } from 'src/app/services/ui.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {

  days:string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  subscription?: Subscription;
  public modelChanged: boolean = false; 
  subModelChanged?: Subscription; 

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
  // This actually do not change the data in the database. 
  // It takes schedule and slot number (i) as arguements. 
  cardClicked(schedule: Schedule, i: number): void {
    console.log('cardClicked() was called inside the schedule component!');
    this.scheduleEmitter.emit({schedule, i});
  }

}
