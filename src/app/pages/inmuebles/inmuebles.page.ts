import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Inmueble, InmuebleCamel } from '../../interfaces/inmueble';
import { InmueblesService } from '../../services/inmuebles.service';
import { User } from '../../interfaces/user';
import { TokenService } from '../../services/token.service';
import { AlertController, ToastController } from '@ionic/angular';

declare var mapboxgl: any

@Component({
  selector: 'app-inmuebles',
  templateUrl: './inmuebles.page.html',
  styleUrls: ['./inmuebles.page.scss'],
})
export class InmueblesPage implements OnInit, AfterViewInit {

  constructor(private inmueblesService: InmueblesService, private tokenService: TokenService, private alertController: AlertController, private toastController: ToastController) { }


  public myInmuebles: any[] 

  propietarioId: any

  flagHiddenMap = true

  inmuebleSelected: Inmueble = {
    latitud: 0,
    longitud: 0,
    ID: 0,
    direccion: '',
    propietario: undefined,
    ambientes: 0,
    tipo: '',
    uso: '',
    precio: 0,
    disponible: false
  }

  private map: any

  async ngOnInit() {
    await this.tokenService.getIdFromToken().then(tokenParsed => {
      this.propietarioId = Number(tokenParsed)
    })

    await this.getMyInmuebles()

  }

  async getMyInmuebles() {
    await this.inmueblesService.getMyInmuebles(this.propietarioId).then(res => {
      this.myInmuebles = res
    })
  }

  async editInmueble() {
    const alert = await this.alertController.create({
      header: 'Editar propiedad',
      inputs: [
        {
          placeholder: 'Dirección',
          name: 'direccion',
          type: 'text',
          value: this.inmuebleSelected.direccion
        },
        {
          placeholder: 'Latitud',
          name: 'latitud',
          type: 'number',
          min: 1,
          value: this.inmuebleSelected.latitud
        },
        {
          placeholder: 'Longitud',
          name: 'longitud',
          type: 'number',
          min: 1,
          value: this.inmuebleSelected.longitud
        },
        {
          placeholder: 'Ambientes',
          name: 'ambientes',
          type: 'number',
          min: 1,
          value: this.inmuebleSelected.ambientes
        },
        {
          placeholder: 'Tipo (casa, depto)',
          name: 'tipo',
          type: 'text',
          value: this.inmuebleSelected.tipo
        },
        {
          placeholder: 'Uso (comercial, personal, laboral)',
          name: 'uso',
          type: 'text',
          value: this.inmuebleSelected.uso
        },
        {
          placeholder: 'Precio',
          name: 'precio',
          type: 'number',
          min: 1,
          value: this.inmuebleSelected.precio
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'tertiary',
        },
        {
          cssClass: 'tertiary',
          text: 'Guardar',
          handler: (cambios) => {
            console.log(cambios)
            var propiedad: Inmueble = {
              ID: this.inmuebleSelected.ID,
              direccion: cambios.direccion,
              ambientes: Number(cambios.ambientes),
              tipo: cambios.tipo,
              uso: cambios.uso,
              precio: Number(cambios.precio),
              disponible: true,
              propietario: this.propietarioId,
              latitud: Number(cambios.latitud),
              longitud: Number(cambios.longitud)
            }

            this.inmueblesService.putInmuebles(propiedad).then(async (res: Inmueble) => {
              this.inmuebleSelected = res
              await this.getMyInmuebles()
              const toast = await this.toastController.create({
                message: 'Propiedad actualizada',
                duration: 2000
              })
              toast.present()
              this.showMap()
            })

          }
        }
      ]
    });

    await alert.present()
  }

  async removeInmueble() {
    const alert = await this.alertController.create({
      header: 'Borrar propiedad',
      message: '¿Desea borrar la propiedad ubicada en <strong>'+this.inmuebleSelected.direccion+'</strong>?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        },
        {
          text: 'Okay',
          handler: async () => {
            this.inmueblesService.deleteInmueble(this.inmuebleSelected.ID).then(async (res) => {
              await this.getMyInmuebles()

              this.flagHiddenMap=true
              const toast = await this.toastController.create({
                message: 'Propiedad borrada',
                duration: 2000
              })
              toast.present()
            })            
          }
        }]
    })
    await alert.present();
  }

  async addInmueble() {
    const alert = await this.alertController.create({
      header: 'Editar propiedad',
      inputs: [
        {
          placeholder: 'Dirección',
          name: 'direccion',
          type: 'text',
        },
        {
          placeholder: 'Latitud',
          name: 'latitud',
          type: 'number',
          min: 1,
        },
        {
          placeholder: 'Longitud',
          name: 'longitud',
          type: 'number',
          min: 1,
        },
        {
          placeholder: 'Ambientes',
          name: 'ambientes',
          type: 'number',
          min: 1,
        },
        {
          placeholder: 'Tipo (casa, depto)',
          name: 'tipo',
          type: 'text',
        },
        {
          placeholder: 'Uso (comercial, personal, laboral)',
          name: 'uso',
          type: 'text',
        },
        {
          placeholder: 'Precio',
          name: 'precio',
          type: 'number',
          min: 1,
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'warning',
        },
        {
          cssClass: 'success',
          text: 'Guardar',
          handler: (cambios) => {
            console.log(cambios)

            var nuevoInmueble: Inmueble = {
              ID: undefined,
              direccion: cambios.direccion,
              ambientes: Number(cambios.ambientes),
              tipo: cambios.tipo,
              uso: cambios.uso,
              precio: Number(cambios.precio),
              disponible: true,
              propietario: this.propietarioId,
              latitud: Number(cambios.latitud),
              longitud: Number(cambios.longitud)
            }
            this.inmueblesService.postInmuebles(nuevoInmueble).then(async (res: Inmueble) => {
              this.myInmuebles.push(res)

              const toast = await this.toastController.create({
                message: 'Nueva propiedad cargada!',
                duration: 2000
              })
              toast.present()
            })

          }
        }
      ]
    });

    await alert.present()
  }




  async ngAfterViewInit() {

    mapboxgl.accessToken = 'pk.eyJ1IjoicGluaW5vMjIiLCJhIjoiY2t2dTM2ZGx4NTZydTJ1bnV1cmRhMXZ4cSJ9.LzwtqBx_vu5GhO-kacYA_g'
    const ubicacion: number[] = [0, 0]

    await this.createMap(ubicacion)
  }

  async showInfo(event) {
    this.flagHiddenMap = false

    await this.inmueblesService.getInmueble(event.detail.value).then((res : Inmueble) =>{
      this.inmuebleSelected = res
    })

    await this.showMap()
  }

  async showMap() {
    const ubicacion: number[] = [this.inmuebleSelected.longitud, this.inmuebleSelected.latitud]

    await this.createMap(ubicacion)

    this.customizeMap()

    this.addMarkerMap(ubicacion)

  }

  createMap(ubicacion: number[]) {
    this.map = new mapboxgl.Map({
      center: ubicacion,
      style: 'mapbox://styles/mapbox/light-v10',
      zoom: 15.5,
      pitch: 0,
      container: 'map',
      antialias: false
    })
  }

  customizeMap() {
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

  addMarkerMap(ubicacion: number[]) {
    const marker = new mapboxgl.Marker({
      draggable: false,
      color: "#DD3333",
      scale: "0.7"
    })
      .setLngLat(ubicacion)
      .setPopup(new mapboxgl.Popup().setHTML("<h2 style=\"color:#000000\">Inmobiliaria La Punta</h2>"))
      .addTo(this.map);
  }



}
