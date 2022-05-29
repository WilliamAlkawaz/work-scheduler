import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Schedule } from '../../../Schedule';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private employeeExternalId:number = 0; 
  private companyId:number = 0; 
  private apiUrl:string ='';
  private updateapiUrl:string='';

  constructor(private http:HttpClient, private route:ActivatedRoute) {  
    var url = new URL(window.location.href);
    this.employeeExternalId = parseInt(url.searchParams.get("employeeExternalId")!);  
    this.companyId = parseInt(url.searchParams.get("companyId")!);

    this.apiUrl = 'https://localhost:44327/api/CustomPatterns?employeeExternalId='+this.employeeExternalId + '&companyId=' + this.companyId;    
    this.updateapiUrl = 'https://localhost:44327/api/CustomPatterns/'
  }

  ngOnInit(): void {    
  }

  getSchedules(): Observable<Schedule[]> {    
    return this.http.get<Schedule[]>(this.apiUrl);
  }

  updateSchedule(schedule: Schedule): Observable<Schedule> {
    const url = `${this.updateapiUrl}`; 
    return this.http.put<Schedule>(url, schedule, httpOptions); 
  }
}