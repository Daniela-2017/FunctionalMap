import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment.prod';

import * as Mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 //mapa: mapboxgl.Map ;
    //Object.getOwnPropertyDescriptor(Mapbox-gl, "accessToken").set('YOUR_TOKEN');
  //mapa: mapboxgl.Map ;
  //Object.getOwnPropertyDescriptor(Mapbox-gl, "accessToken").set('YOUR_TOKEN');
  map!: Mapboxgl.Map;
  ruta = new Array();
  
  
  ngOnInit() {
    if (!navigator.geolocation){
      console.log('location is not supported')
    }
    navigator.geolocation.getCurrentPosition((position)=>{
      const coords = position.coords;
        (Mapboxgl as any).accessToken = environment.mapboxKey;
        this.map = new Mapboxgl.Map({
        //accessToken : environment.mapboxKey,
        container: 'mapa-mapbox', // container id
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [coords.longitude, coords.latitude], // starting position
        zoom: 14 // starting zoom
      });
    this.crearMarcador();
    //this.crearRuta()
    console.log(this.ruta)
    });
    //Mapboxgl.accessToken = environment.mapboxKey;

  }

  crearMarcador(){
    this.map.on('click', (e)=>{
      console.log(e.lngLat.toString());
      const marker = new Mapboxgl.Marker({
        draggable: true
        })
        .setLngLat([e.lngLat.lng, e.lngLat.lat])
        .addTo(this.map);
        marker.on('drag', () =>{
          console.log(marker.getLngLat())
          this.ruta.push([marker.getLngLat().lng, marker.getLngLat().lat]);


        })


    })
      
  }
  crearRut(){
    console.log(this.ruta)
  }
  


  crearRuta() {


    //this.map.on('load', ()=>{
      this.map.addSource('route', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
          'type': 'LineString',
          'coordinates': this.ruta
          }
          }
      })
      this.map.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
        'line-join': 'round',
        'line-cap': 'round'
        },
        'paint': {
        'line-color': '#888',
        'line-width': 8
        }
        });
    //});

  
  
  
}
}

