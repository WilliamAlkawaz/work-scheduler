import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Schedule } from '../../../Schedule';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private apiUrl:string ='http://localhost:5000/schedules';

  constructor(private http:HttpClient) {  
  }

  getSchedules(): Observable<Schedule[]> {    
    return this.http.get<Schedule[]>(this.apiUrl);
  }

  updateSchedule(schedule: Schedule): Observable<Schedule> {
    return this.http.put<Schedule>(`${this.apiUrl}/${schedule.id}`, schedule, httpOptions); 
  }

  // This can be generalised by may be fetching it from the API.
  getTimeSlots(): string[] {
    return ["08:00-08:30", "08:30-09:00", "09:00-09:30", "09:30-10:00", "10:00-10:30", "10:30-11:00", 
    "11:00-11:30", "11:30-12:00", "12:00-12:30", "12:30-13:00", "13:00-13:30", "13:30-14:00",  
    "14:00-14:30", "14:30-15:00", "15:00-15:30", "15:30-16:00", "16:00-16:30", "16:30-17:00" ];
  }
}