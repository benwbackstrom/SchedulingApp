import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapserviceService {

  constructor(private http: HttpClient) { }

  getMyLocation():Observable<any>{
    return this.http.get('https://ipapi.co/json/') as Observable<any>;
  }

  getGeocode(location:string):Observable<any>{
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json',{params:{address:location,key:'AIzaSyC2BO1AnBvAjcjBxdxq0WxKDvpENEiPP3s'}}) as Observable<any>;
  }

}
