import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit {

  @Input() lngLat?: [number, number];
  @ViewChild('map') divMap?: ElementRef;



  ngAfterViewInit(): void {
  if (!this.lngLat) throw 'LngLat can not be null';
  if (!this.divMap?.nativeElement) throw 'divMap can not be null';

  const map = new Map({
    container: this.divMap?.nativeElement, // container ID
    accessToken: 'pk.eyJ1IjoibWF0dXRlczAxIiwiYSI6ImNtM3c0endvejBjbWcybm9pdGttamVzdmgifQ.8BOVmWZaCNHSS4TMttTkdw',
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: this.lngLat, // starting position [lng, lat]
    zoom: 15, // starting zoom
    interactive: false
   });

   new Marker()
    .setLngLat(this.lngLat)
    .addTo(map);

  }

}
