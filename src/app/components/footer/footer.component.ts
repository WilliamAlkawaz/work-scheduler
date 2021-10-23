import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  modelChanged:boolean = false; 
  subscription?:Subscription;

  constructor(private uiService:UiService) {
    this.subscription = this.uiService.onModelChanged().subscribe(s => this.modelChanged = s);
   }

  ngOnInit(): void {
  }

  toSave(): void {
    this.uiService.toSave(); 
  }

  toCancel(): void {
    this.uiService.toCancel(); 
  }
}
