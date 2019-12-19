import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentPositionService {
  position: google.maps.LatLng;
  positionChange: Subject<google.maps.LatLng> = new Subject<google.maps.LatLng>();
  constructor() {
   }

  setPosition(newLatLng){
    this.position = newLatLng; 
    this.positionChange.next(this.position);
   }
  
  getPosition(){
    return this.position;
  }
}
