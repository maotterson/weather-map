import { Component, OnInit } from '@angular/core';
import {} from 'googlemaps';
import { AfterContentInit, ViewChild } from '@angular/core';

import {CurrentPositionService} from '../current-position.service';
declare var google: any;



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements AfterContentInit {
  mapElement: any;
  map: google.maps.Map;
  marker: google.maps.Marker;

  constructor(
    private currentPositionService: CurrentPositionService
  ) { }

  ngAfterContentInit() {
    this.loadMap();
  }

  loadMap(){
    this.mapElement = document.getElementById('mapElement');

    this.setLocation(41.4981202910055, -81.7042828306395);
    this.map.addListener('click', e => {
      this.addMarker(e.latLng);
      this.getWeather(e.latLng);
    });
 }

 setLocation(x,y){
   const mapProperties = {
    center: new google.maps.LatLng(x,y),
    zoom: 5,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true
   };
   this.map = new google.maps.Map(this.mapElement, mapProperties);
 }

  addMarker(newLatLng){
    if(this.marker==null){
      this.marker = new google.maps.Marker({
        position: newLatLng,
        map: this.map
      });
    }
    else{
      this.marker.setPosition(newLatLng);
    }
    this.map.panTo(newLatLng);
  }

  getWeather(newLatLng){
    this.currentPositionService.setPosition(newLatLng);
  }

}
