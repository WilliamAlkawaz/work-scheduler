import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Schedule } from '../../../Schedule';
import { TempSchedules } from 'TempSchedules';
import { UiService } from 'src/app/services/ui.service';
import { map, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private apiUrl = 'https://localhost:44327/api/CustomPatterns/2';
  public slots: string[] =   ['08:00-08:30', '08:30-09:00', '09:00-09:30', '09:30-10:00', '10:00-10:30', '10:30-11:00', 
    '11:00-11:30', '11:30-12:00', '12:00-12:30', '12:30-13:00', '13:00-13:30', '13:30-14:00',  
    '14:00-14:30', '14:30-15:00', '15:00-15:30', '15:30-16:00', '16:00-16:30', '16:30-17:00' ];
  public days:string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  constructor(private http:HttpClient) {     
    //this.getSchedules(); 
  }

  ngOnInit(): void {
  }
  getSchedules(): Observable<Schedule[]> {    
    return this.http.get<Schedule[]>(this.apiUrl);
    //.pipe(map(res => this.check(res)));
    //.pipe(map(res => this.processData(res)));
  }

  updateSchedule(schedule: Schedule): Observable<Schedule> {
    const url = `${this.apiUrl}`; 
    return this.http.put<Schedule>(url, schedule, httpOptions); 
  }
}