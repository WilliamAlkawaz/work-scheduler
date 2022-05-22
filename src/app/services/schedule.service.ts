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
  private apiUrl = 'https://localhost:44327/api/CustomPatterns/2';

  constructor(private http:HttpClient) {     
    //this.getSchedules(); 
  }

  ngOnInit(): void {
  }
  getSchedules(): Observable<Schedule[]> {    
    return this.http.get<Schedule[]>(this.apiUrl);
  }

  updateSchedule(schedule: Schedule): Observable<Schedule> {
    const url = `${this.apiUrl}`; 
    return this.http.put<Schedule>(url, schedule, httpOptions); 
  }
}