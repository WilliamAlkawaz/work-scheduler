import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Schedule } from 'Schedule';
import { UiService } from 'src/app/services/ui.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cell-schedule',
  templateUrl: './cell-schedule.component.html',
  styleUrls: ['./cell-schedule.component.css']
})
export class CellScheduleComponent implements OnInit {

  faPlus = faPlus;

  @Input()
  schedule:Schedule;

  @Input()
  i:number;

  @Output('scheduleChanged')
  scheduleEmitter = new EventEmitter<{schedule:Schedule, i:number}>(); 

  constructor(public uiService:UiService) { }

  ngOnInit(): void {
  }

  // This function is called when "+ADD" is clicked. This button is displayed
  // only when a user hover over a certain slot. This function sets the start
  // time and the day in the form in the right. 
  onClick(s:Schedule, i:number): void {
    console.log('from cell!');
    this.uiService.setStartTime(i);
    this.uiService.setEndTime(i); 
    this.uiService.setWeekDay(s.weekDay);
    this.uiService.setWorkType(s.workType[i]);
  }

}
