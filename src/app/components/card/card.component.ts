import { I18nPluralPipe } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Schedule } from 'Schedule';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() schedule: Schedule = {
    id : 0, 
    weekDay : "",
    assigned : [], 
    times : [], 
    workType : [], 
    barberId : 0
  };
  @Input() i: number = 0; 
  @Output() cardClicked = new EventEmitter;
  faTimes = faTimes; 

  constructor() { }

  ngOnInit(): void {
  }

  onClick(schedule: Schedule, i: number): void {
    this.cardClicked.emit();
  }
}
