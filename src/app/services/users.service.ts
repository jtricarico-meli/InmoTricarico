import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginView } from '../interfaces/LoginView';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  public login(credenciales: LoginView) : Promise<string> {
    //crear headers para enviar json en body
    const headers = {
      contentType: 'application/json'
    }

    //enviar peticion http con credenciales
    return new Promise<string>((resolve,reject) =>
    this.httpClient.post('http://practicastuds.ulp.edu.ar/api/Propietarios/login',
    credenciales, {headers,responseType:'text'}
    ).subscribe(res => resolve(res), err => reject(err)))
  }

  public getPerfil(token: string) {
		//crear headers para enviar json en body y agregar token
		const headers = {
			contentType: 'application/json',
			authorization:  `Bearer ${token}`

		};
		//enviar peticion http con credenciales
		return new Promise((resolve, reject) =>
		this.httpClient.get('http://practicastuds.ulp.edu.ar/api/Propietarios/',	{ headers }
		).subscribe(res => resolve(res), err => reject(err)));
	}

}
