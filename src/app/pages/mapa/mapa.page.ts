import { AfterViewInit, Component, OnInit } from '@angular/core';

declare var mapboxgl : any 

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit, AfterViewInit {

  constructor() { }

  private map: any


  ngAfterViewInit(): void {
    mapboxgl.accessToken = 'pk.eyJ1IjoicGluaW5vMjIiLCJhIjoiY2t2dTM2ZGx4NTZydTJ1bnV1cmRhMXZ4cSJ9.LzwtqBx_vu5GhO-kacYA_g'

    const ubicacion:number[] =[-66.3076719,-33.2711688]
    
    this.createMap(ubicacion)

    this.customizeMap()

    this.addMarkerMap(ubicacion)    
    
  }

  ngOnInit() {
  }

  createMap(ubicacion:number[]){
    this.map = new mapboxgl.Map({
      center: ubicacion,
      style: 'mapbox://styles/mapbox/light-v10',
      zoom: 15.5,
      pitch: 80,
      container: 'map',
      antialias: false
    })
  }

  customizeMap(){
    this.map.on('load', () => {
      // Insert the layer beneath any symbol layer.
      const layers = this.map.getStyle().layers;
      const labelLayerId = layers.find(
          (layer) => layer.type === 'symbol' && layer.layout['text-field']
      ).id;

      // The 'building' layer in the Mapbox Streets
      // vector tileset contains building height data
      // from OpenStreetMap.
      this.map.addLayer(
          {
              'id': 'add-3d-buildings',
              'source': 'composite',
              'source-layer': 'building',
              'filter': ['==', 'extrude', 'true'],
              'type': 'fill-extrusion',
              'minzoom': 15,
              'paint': {
                  'fill-extrusion-color': '#aaa',

                  // Use an 'interpolate' expression to
                  // add a smooth transition effect to
                  // the buildings as the user zooms in.
                  'fill-extrusion-height': [
                      'interpolate',
                      ['linear'],
                      ['zoom'],
                      15,
                      0,
                      15.05,
                      ['get', 'height']
                  ],
                  'fill-extrusion-base': [
                      'interpolate',
                      ['linear'],
                      ['zoom'],
                      15,
                      0,
                      15.05,
                      ['get', 'min_height']
                  ],
                  'fill-extrusion-opacity': 0.6
              }
          },
          labelLayerId
      );
    });
  }

  addMarkerMap(ubicacion:number[]){
    const marker = new mapboxgl.Marker({
      draggable: false,
      color:"#DD3333",
      scale:"0.7"
      })
      .setLngLat(ubicacion)
      .setPopup(new mapboxgl.Popup().setHTML("<h2 style=\"color:#000000\">Inmobiliaria La Punta</h2>"))
      .addTo(this.map);
  }


}
