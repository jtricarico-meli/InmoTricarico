import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginView, Token } from '../interfaces/LoginView';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient, private storage: StorageService) { }

  public login(credenciales: LoginView): Promise<string> {
    //crear headers para enviar json en body
    const headers = {
      "Content-Type": 'application/json'
    }

    //enviar peticion http con credenciales
    return new Promise<string>((resolve, reject) =>
      this.httpClient.post('http://localhost:8080/login',
        credenciales, { headers }
      ).subscribe(async res => {
        //guarda el token en el storage local
        await this.storage.set('token',res)
        resolve("token")
      }, err => reject(err)))
  }

  public async getPerfil() {
    //crear headers para enviar json en body y agregar token
    const headers = {
      "Content-Type": 'application/json',
      "Authorization" : `Bearer ${await this.getToken()}`
    };
    //enviar peticion http con credenciales
    return new Promise((resolve, reject) =>
      this.httpClient.get('http://localhost:8080/propietario/', { headers }
      ).subscribe(res => resolve(res), err => reject(err)));
  }

  public async setPerfil(perfil: any) {
    //crear headers para enviar json en body y agregar token
    const headers = {
      "Content-Type": 'application/json',
      "Authorization" : `Bearer ${await this.getToken()}`

    };

    //enviar peticion http con credenciales
    return new Promise((resolve, reject) =>
      this.httpClient.put('http://localhost:8080/propietario/'+perfil.ID , perfil, { headers }
      ).subscribe(res => resolve(res), err => reject(err)));
  }

  private async getToken(): Promise<string> {
    return await this.storage.get('token').then((token: Token) => {
      return token.token;
    });
  }


}
