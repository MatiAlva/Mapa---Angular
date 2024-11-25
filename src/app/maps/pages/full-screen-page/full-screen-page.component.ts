import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';


@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})
export class FullScreenPageComponent implements AfterViewInit {

  @ViewChild('map') divMap?: ElementRef;
  public currentLngLat: LngLat = new LngLat(-58.46196111916014, -34.61451577543698);

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'El elemento HTML no fue encontrado';
    const map = new Map({
      container: this.divMap?.nativeElement, // container ID
      accessToken: 'pk.eyJ1IjoibWF0dXRlczAxIiwiYSI6ImNtM3c0endvejBjbWcybm9pdGttamVzdmgifQ.8BOVmWZaCNHSS4TMttTkdw',
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: 9, // starting zoom
     });
  }



}
