import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Marker } from 'mapbox-gl';
import { Map } from 'mapbox-gl';
import { MarkerAndColor, PlainMarker } from '../../interfaces/markerPage.interfaces';


@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map') divMap?: ElementRef;

  public markers : MarkerAndColor[] = []

  public zoom: number = 12
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-58.46196111916014, -34.61451577543698);

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'El elemento HTML no fue encontrado';
    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      accessToken: 'pk.eyJ1IjoibWF0dXRlczAxIiwiYSI6ImNtM3c0endvejBjbWcybm9pdGttamVzdmgifQ.8BOVmWZaCNHSS4TMttTkdw',
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
     });


     this.readFromLocalStorage()

  }

  ngOnDestroy(): void {
    this.map?.remove()
  }
  

  createMarker () {
    if ( !this.map ) throw 'Mapa no inicializado';

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map!.getCenter();

    this.addMarker(lngLat, color)

  }
  
  addMarker(lngLat: LngLat, color: string) {
    if (!this.map) return

    const marker = new Marker({
      color,
      draggable: true
    }).setLngLat(lngLat)
      .addTo(this.map);

    this.markers.push({ color, marker });
    this.saveToLocalStorage()

    marker.on('dragend', () => this.saveToLocalStorage());

  }

  deleteMarker( index: number) {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
  }

  flyTo( marker: Marker ) {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    })

  }


  saveToLocalStorage() {
    const plaintMarkers: PlainMarker[] = this.markers.map( ({ color, marker }) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    })

    localStorage.setItem('plainMarkers', JSON.stringify(plaintMarkers))

  }


  readFromLocalStorage() {
    const plaintMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plaintMarkers: PlainMarker[] = JSON.parse(plaintMarkersString);

    plaintMarkers.forEach(({ color, lngLat }) => {
      const [ lng, lat ] = lngLat;
      const coords = new LngLat(lng, lat);
      this.addMarker(coords, color)
    })


  }

}
