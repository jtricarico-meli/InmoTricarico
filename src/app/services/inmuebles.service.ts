import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Inmueble, InmuebleCamel } from '../interfaces/inmueble';

@Injectable({
  providedIn: 'root'
})
export class InmueblesService {

  constructor(private httpClient: HttpClient, private storage: StorageService) { }

  public async getInmueble(id: any) {
    //crear headers para enviar json en body y agregar token
    const headers = {
      contentType: 'application/json',
      authorization: `Bearer ${await this.getToken()}`

    };
    //Obtener el inmueble con el id
    return new Promise((resolve, reject) =>
      this.httpClient.get('http://practicastuds.ulp.edu.ar/api/Inmuebles/' + id, { headers }
      ).subscribe(res => resolve(res), err => reject(err)));
  }

  private async getAllInmuebles() {
    //crear headers para enviar json en body y agregar token
    const headers = {
      contentType: 'application/json',
      authorization: `Bearer ${await this.getToken()}`

    };
    //Obtener todos los inmuebles
    return new Promise((resolve, reject) =>
      this.httpClient.get('http://practicastuds.ulp.edu.ar/api/Inmuebles/0', { headers }
      ).subscribe(res => resolve(res), err => reject(err)));
  }

  public async getMyInmuebles(id: number) {
    var misInmuebles : Array<Inmueble> = []
    await this.getAllInmuebles().then((inmuebles: Inmueble[]) => {   
      inmuebles.forEach((casa) => {
        if (casa.propietarioId == id) {
          misInmuebles.push(casa)
        }
      })
    })
    return misInmuebles
  }


  public async putInmuebles(inmueble: InmuebleCamel) {
    //crear headers para enviar json en body y agregar token
    const headers = {
      contentType: 'application/json',
      authorization: `Bearer ${await this.getToken()}`

    };
    //Editar un inmuebles
    console.log(inmueble)
    return new Promise((resolve, reject) =>
      this.httpClient.put('http://practicastuds.ulp.edu.ar/api/Inmuebles/' + inmueble.Id, inmueble, { headers }
      ).subscribe(res => resolve(res), err => reject(err)));
  }

  public async postInmuebles(inmueble: InmuebleCamel) {
    //crear headers para enviar json en body y agregar token
    const headers = {
      contentType: 'application/json',
      authorization: `Bearer ${await this.getToken()}`

    };
    //Agregar un inmuebles
    console.log(inmueble)
    return new Promise((resolve, reject) =>
      this.httpClient.post('http://practicastuds.ulp.edu.ar/api/Inmuebles', inmueble, { headers }
      ).subscribe(res => resolve(res), err => reject(err)));
  }

  public async deleteInmueble(id: number) {
    //crear headers para enviar json en body y agregar token
    const headers = {
      contentType: 'application/json',
      authorization: `Bearer ${await this.getToken()}`

    };
    //Agregar un inmuebles
    return new Promise((resolve, reject) =>
      this.httpClient.delete('http://practicastuds.ulp.edu.ar/api/Inmuebles/'+id, { headers }
      ).subscribe(res => resolve(res), err => reject(err)));
  }

  private async getToken(): Promise<string> {
    return await this.storage.get('token')
  }
}
