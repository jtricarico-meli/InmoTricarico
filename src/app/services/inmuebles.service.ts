import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Inmueble, InmuebleCamel } from '../interfaces/inmueble';
import { Token } from '../interfaces/LoginView';

@Injectable({
  providedIn: 'root'
})
export class InmueblesService {

  constructor(public httpClient: HttpClient, public storage: StorageService) { }

  public async getInmueble(id: any) {
    //crear headers para enviar json en body y agregar token
    const headers = {
      "Content-Type": 'application/json',
      "Authorization" : `Bearer ${await this.getToken()}`

    };
    //Obtener el inmueble con el id
    return new Promise((resolve, reject) =>
      this.httpClient.get('http://localhost:8080/inmueble/' + id, { headers }
      ).subscribe(res => resolve(res), err => reject(err)));
  }

  public async getAllInmuebles(id: number) {
    //crear headers para enviar json en body y agregar token
    const headers = {
      "Content-Type": 'application/json',
      "Authorization" : `Bearer ${await this.getToken()}`

    };
    //Obtener todos los inmuebles
    return new Promise((resolve, reject) =>
      this.httpClient.get('http://localhost:8080/inmueble/all/'+id, { headers }
      ).subscribe(res => resolve(res), err => reject(err)));
  }

  public async getMyInmuebles(id: number): Promise<Array<Inmueble>> {
    var misInmuebles : Array<Inmueble> = []
    await this.getAllInmuebles(id).then((inmuebles: Array<Inmueble>) => {   
      Object.keys(inmuebles).forEach(inmueble => {
        misInmuebles.push(inmuebles[inmueble]);
      })
    }, err => console.log(err))
    return misInmuebles
  }


  public async putInmuebles(inmueble: Inmueble) {
    //crear headers para enviar json en body y agregar token
    const headers = {
      "Content-Type": 'application/json',
      "Authorization" : `Bearer ${await this.getToken()}`

    };
    //Editar un inmuebles
    console.log(inmueble)
    return new Promise((resolve, reject) =>
      this.httpClient.put('http://localhost:8080/inmueble/' + inmueble.ID, inmueble, { headers }
      ).subscribe(res => resolve(res), err => reject(err)));
  }

  public async postInmuebles(inmueble: Inmueble) {
    //crear headers para enviar json en body y agregar token
    const headers = {
      "Content-Type": 'application/json',
      "Authorization" : `Bearer ${await this.getToken()}`

    };
    //Agregar un inmuebles
    console.log(inmueble)
    return new Promise((resolve, reject) =>
      this.httpClient.post('http://localhost:8080/inmueble', inmueble, { headers }
      ).subscribe(res => resolve(res), err => reject(err)));
  }

  public async deleteInmueble(id: number) {
    //crear headers para enviar json en body y agregar token
    const headers = {
      "Content-Type": 'application/json',
      "Authorization" : `Bearer ${await this.getToken()}`

    };
    //Agregar un inmuebles
    return new Promise((resolve, reject) =>
      this.httpClient.delete('http://localhost:8080/inmueble/'+id, { headers }
      ).subscribe(res => resolve(res), err => reject(err)));
  }

  private async getToken(): Promise<string> {
    return await this.storage.get('token').then((token: Token) => {
      return token.token;
    });
  }
}
