import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { MapserviceService } from 'src/app/services/mapservice.service';

@Component({
  selector: 'app-locationmap',
  templateUrl: './locationmap.component.html',
  styleUrls: ['./locationmap.component.css']
})
export class LocationmapComponent implements OnInit {

  constructor(private ms: MapserviceService){}

  public map:any; //variable stores the map object
  public myMarker:any; //stores a single marker of my location
  public myLat: number = 0; //stores my Lat
  public myLng: number = 0; //stores my Lng
  public address:string = "";//13307 Midway Rd Farmers Branch TX
  public aptLocationArray:any[] = [{name:"Costco",lat:35.1257107, lng:-118.2644864},{name:"APP",lat:34.0750972, lng:-118.3026504},{name:"Cvs",lat:34.06168746948242, lng:-118.30403137207031}];
  public aptDisplayArray: any[] = [];
  public aptDisplayNumber:number = 3;


  ngOnInit(): void {

    if(confirm('Allow this application to know your location')){
      //Calls Http request for location from public IP
      this.ms.getMyLocation().subscribe(
        (myInfo:any)=>{
          this.myLat = myInfo.latitude;
          this.myLng = myInfo.longitude;
          console.log(myInfo);
          this.createMap(this.myLat,this.myLng);
        },
        ()=>{
          console.log("Location not found!");
        }
      );
    }
    else{
      //default location New York
      this.createMap(40.7128, -74.0060);
    }
  }

  //creates a new Map
  createMap(Lat:number, Lng:number){
    let loader = new Loader({
      apiKey:'AIzaSyC2BO1AnBvAjcjBxdxq0WxKDvpENEiPP3s'
    });
    loader.load().then(() => {
      console.log("getting map!!!");
      this.map = new google.maps.Map(document.getElementById("map")!, {
        center:{lat: Lat , lng: Lng},
        zoom:12
      });

      this.myMarker = this.createMyMarker(Lat,Lng);

      for(let item of this.aptLocationArray){
        this.aptDisplayArray.push(this.createMyMarker(item.lat, item.lng).setIcon("https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"));
      }
      

    });

  }

  changeMap():void{
    this.ms.getGeocode(this.address).subscribe(
      (geocode:any)=>{
        console.log(geocode);
        this.myLat = geocode.results[0].geometry.location.lat;
        this.myLng = geocode.results[0].geometry.location.lng;
        this.changeMapCenter(this.myLat, this.myLng);
      },
      ()=>{
        console.log("Location not found!");
      }
    );
  }

  changeMapCenter(Lat:number,Lng:number):void{
    console.log(Lat, Lng);
    this.map.setCenter({lat:Lat, lng:Lng});
    this.myMarker.setMap(null);
    this.createMyMarker(Lat,Lng);
  }

  //create marker based on location
  createMyMarker(Lat:number,Lng:number):any{
    return new google.maps.Marker({
      position:{lat: Lat, lng: Lng},
      map:this.map
    });
  }

}
