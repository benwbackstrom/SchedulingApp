import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarserviceService {

  constructor(private http: HttpClient) { }

  getTimes():Observable<any>{//maps javascript api
    return this.http.get('http://localhost:3000/times') as Observable<any>;
  }
}
