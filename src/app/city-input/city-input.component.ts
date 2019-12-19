import { Component, OnInit } from '@angular/core';
import {CurrentPositionService} from '../current-position.service';
import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import {environment} from '../../environments/environment';



@Component({
  selector: 'app-city-input',
  templateUrl: './city-input.component.html',
  styleUrls: ['./city-input.component.css']
})
export class CityInputComponent implements OnInit {
  subscription: any;
  position: google.maps.LatLng;
  currentTemperature: any;
  cityName: any;
  currentWeather: any;
  currentWeatherIcon: any;


  constructor(
    private currentPositionService: CurrentPositionService,
    private http: HttpClient) { 
      this.subscription = currentPositionService.positionChange.subscribe((value) => { 
        this.position = value;
        this.getCity();
        this.getWeather();
      });
    }

  ngOnInit() {
    this.position = null;
  }

  getCity(){
    // api location https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY
    const lat = this.position.lat();
    const lng = this.position.lng();
    const apiKey: string = environment.googleAPIKey;
    const url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&key="+apiKey;
    console.log(url);
    let cityObs = this.http.get(url);
    cityObs.subscribe((data:any) =>{
      if(data.plus_code.compound_code!=null){
        this.cityName=data.plus_code.compound_code.slice(8);
      }
      else{
        this.cityName="Unknown";
      }
    });

  }

  getWeather(){
    // api location https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139
    const lat = this.position.lat();
    const lng = this.position.lng();
    const apiKey: string = environment.weatherMapAPIKey;
    const url = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lng+"&APPID="+apiKey+"&units=imperial";
    let weatherObs = this.http.get(url);
    weatherObs.subscribe((data: any) => {
      this.currentTemperature=data.main.temp.toFixed(0);
      this.currentWeatherIcon="http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png";
      this.currentWeather=data.weather[0].description;
    });
  }

}
