import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellScheduleComponent } from './cell-schedule.component';

describe('CellScheduleComponent', () => {
  let component: CellScheduleComponent;
  let fixture: ComponentFixture<CellScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CellScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
