import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { Locationmodel } from 'src/app/models/locationmodel';
import { MapserviceService } from 'src/app/services/mapservice.service';
import { ApptTransferService } from 'src/app/services/appt-transfer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-locationmap',
  templateUrl: './locationmap.component.html',
  styleUrls: ['./locationmap.component.css']
})
export class LocationmapComponent implements OnInit {

  constructor(private ms: MapserviceService, private transferService: ApptTransferService, private router: Router){}

  public map:any; //variable stores the map object
  public myMarker:any; //stores a single marker of my location
  public myLat: number = 0; //stores my Lat
  public myLng: number = 0; //stores my Lng
  public formatted_address:string = "";//13307 Midway Rd Farmers Branch TX
  public tempAddress:string = "";
  public aptLocationProxyArray:any[] = [{name:"Costco", formatted_address:"2901 Los Feliz Blvd, Los Angeles, CA 90039", lat:34.128521, lng: -118.263657},
                                        {name:"Walgreens",formatted_address: "3201 W 6th St, Los Angeles, CA 90020", lat:34.064510, lng:-118.292030},
                                        {name:"Cvs",formatted_address:"4707 W N Venice Blvd, Los Angeles, CA 90019",lat:34.042250, lng:-118.365330},
                                        {name:"BestBuy",formatted_address: "4255 Lyndon B Johnson Fwy, Farmers Branch, TX 75244", lat:32.927410, lng:-96.837310},
                                        {name:"Walmart",formatted_address: "4122 Lyndon B Johnson Fwy, Dallas, TX 75244", lat:32.921832, lng:-96.840491},
                                        {name:"Costco",formatted_address: "8055 Churchill Way, Dallas, TX 75251", lat:32.919567, lng:-96.768389}];
  public aptLocationArray:any[] = [];
  public aptDisplayArray: any[] = [];
  public aptDestArray: any[] = []; //holds all the markers for 
  public aptDisplayNumber:number = 40000;

  private directionService:any;
  private directionDisplay:any;
  public storeLocation:any = null;


  ngOnInit(): void {

    //first we populate Array
    this.populateLocationArray();

    if(confirm('Allow this application to know your location')){
      //Calls Http request for location from public IP
      this.ms.getMyLocation().subscribe(
        (myInfo:any)=>{
          this.myLat = myInfo.latitude;
          this.myLng = myInfo.longitude;
          this.formatted_address = myInfo.city + ", " + myInfo.region_code + ", " + myInfo.country_code + " " + myInfo.postal;
          //console.log(this.formatted_address);
          this.createMap(this.myLat,this.myLng);
        },
        ()=>{
          console.log("Location not found!");
        }
      );
    }
    else{
      //default location New York
      this.myLat = 40.7128;
      this.myLng = -74.0060;
      this.formatted_address = "New York, US";
      this.createMap(40.7128, -74.0060);
    }

    //console.log(this.transferService.getAppt()); //Debugging: I wish to verify that it actually saves this
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

      //first get distances for the Array
      this.createDistanceForArray();

      this.directionService = new google.maps.DirectionsService();
      this.directionDisplay = new google.maps.DirectionsRenderer();
      this.directionDisplay.setMap(this.map);
      //console.log(this.aptLocationArray)

    });
  }

  //creates Array with Distance modifier
  createDistanceForArray():void{
    let matrix = new google.maps.DistanceMatrixService();
    matrix.getDistanceMatrix({

      origins:[new google.maps.LatLng(this.myLat,this.myLng)],
      destinations:this._createDestination(),
      travelMode:google.maps.TravelMode.DRIVING

    }, (response:any, status:any) =>{

      for(let i = 0; i < response.rows[0].elements.length; i++){
        this.aptLocationArray[i].distance = Number(response.rows[0].elements[i].distance.value);
      }

      this._sortArrayDistance();

      for(let item of this.aptDestArray){
        item.setMap(null);
      }

      this.aptDisplayArray = [];
      this.aptDestArray = [];

      for(let item of this.aptLocationArray){
        if(item.distance > this.aptDisplayNumber){
          break;
        }
        this.aptDisplayArray.push(item);
        let tempMarker = this.createMyMarker(item.lat, item.lng);
        tempMarker.setIcon("https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png");
        this._addInfoListener(item.name, tempMarker);
        this.aptDestArray.push(tempMarker);
      }
      //console.log(this.aptLocationArray);
    });
  }

  _addInfoListener(content:string, marker:any):void{
    var infoWindow = new google.maps.InfoWindow();
    marker.addListener('click', () =>{
      infoWindow.close();
      infoWindow.setContent(content);
      infoWindow.open(this.map,marker);
    });
  }

  //helper function to create destination array in the form of google's latlng object
  _createDestination():any[]{
    let latlng = [];
    for(let location of this.aptLocationArray){
      latlng.push(new google.maps.LatLng(location.lat,location.lng));
    }
    return latlng;
  }

  //populate new array in the beginning to have distance variable
  populateLocationArray():void{
    for(let location of this.aptLocationProxyArray){
      this.aptLocationArray.push(new Locationmodel(location.name, location.formatted_address, location.lat, location.lng, -1));
    }
    console.log(this.aptLocationArray);
  }

  //Interactive changing the address
  changeMap():void{
    this.ms.getGeocode(this.tempAddress).subscribe(
      (geocode:any)=>{
        //console.log(geocode);
        this.myLat = geocode.results[0].geometry.location.lat;
        this.myLng = geocode.results[0].geometry.location.lng;
        this.directionDisplay.setDirections({routes: []});
        this.storeLocation = null;
        this.changeMapCenter(this.myLat, this.myLng);
        this.createDistanceForArray();
      },
      ()=>{
        console.log("Location not found!");
      }
    );
  }

  changeMapCenter(Lat:number,Lng:number):void{
    this.map.setCenter({lat:Lat, lng:Lng});
    this.myMarker.setMap(null);
    this.myMarker = this.createMyMarker(Lat,Lng);
    //console.log("My marker " + this.myMarker)
  }

  changeViewCenter(location:any):void{

    let destination = new google.maps.LatLng(location.lat,location.lng);
    let request = {
      origin: new google.maps.LatLng(this.myLat,this.myLng),
      destination: destination,
      travelMode:google.maps.TravelMode.DRIVING
    }
    this.directionService.route(request, (response:any, status:any) =>{
      console.log(response);
      this.directionDisplay.setDirections(response);
      this.storeLocation = location;
    });
    //const calculateDirections = (thi)
  }

  //create marker based on location
  createMyMarker(Lat:number,Lng:number):any{
    return new google.maps.Marker({
      position:{lat: Lat, lng: Lng},
      map:this.map
    });
  }

  _sortArrayDistance(){
    this.aptLocationArray.sort((a,b) => (a.distance > b.distance) ? 1 : -1);
  }

  chooseLocation(location: any): void{
    //This method will actually populate the appointment location and send to the next page

    this.transferService.setApptLocation(location.formatted_address);
    //console.log(this.transferService.getAppt()); //Debugging statement

    this.router.navigate(['datetime']);
    //This will take us to the calendar component view
  }

  resetMap():void{
    this.directionDisplay.setDirections({routes: []});
    this.map.setCenter({lat:this.myLat, lng:this.myLng});
    this.storeLocation = null;
  }
  goLocation():void{
    this.transferService.setApptLocation(this.storeLocation.formatted_address);
    //console.log(this.transferService.getAppt()); //Debugging statement

    this.router.navigate(['datetime']);
    //This will take us to the calendar component view
  }

}
