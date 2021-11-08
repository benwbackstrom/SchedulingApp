import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapserviceService {

  constructor(private http: HttpClient) { }

  getMyLocation():Observable<any>{//maps javascript api
    return this.http.get('https://ipapi.co/json/') as Observable<any>;
  }

  getGeocode(location:string):Observable<any>{//geocoding api
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json',{params:{address:location,key:'AIzaSyC2BO1AnBvAjcjBxdxq0WxKDvpENEiPP3s'}}) as Observable<any>;
  }

  getAddresses():Observable<any>{//maps javascript api
    return this.http.get('http://localhost:3000/addresses') as Observable<any>;
  }
/*
  getDistance(origin:any, destination:any):Observable<any>{//distance matric api
    return this.http.get('https://maps.googleapis.com/maps/api/distancematrix/json?origins=37.7680296%2C-122.4375126&destinations=side_of_road%3A37.7663444%2C-122.4412006&key=AIzaSyC2BO1AnBvAjcjBxdxq0WxKDvpENEiPP3s') as Observable<any>
    //return this.http.get('https://maps.googleapis.com/maps/api/distancematrix/json',{params:{origins:'146 N Kingsley Dr Los Angeles CA',destinations:'2901 Los Feliz Blvd, Los Angeles, CA 90039',key:'AIzaSyC2BO1AnBvAjcjBxdxq0WxKDvpENEiPP3s'}}) as Observable<any>;
  }*/

}
