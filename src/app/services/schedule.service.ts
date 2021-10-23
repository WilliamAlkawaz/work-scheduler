import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
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
  private apiUrl = 'http://localhost:5000/schedules'

  constructor(private http:HttpClient) { }

  getSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.apiUrl);
  }

  updateSchedule(schedule: Schedule): Observable<Schedule> {
    const url = `${this.apiUrl}/${schedule.id}`; 
    return this.http.put<Schedule>(url, schedule, httpOptions); 
  }
}
