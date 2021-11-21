import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private storage: StorageService) { }

  parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

  async checkToken(): Promise<boolean> {
    var res = false
    var tokenPromise: Promise<string> = await this.storage.get('token')

    if (tokenPromise) {
      await this.storage.get('token').then((token) => {
        if (token) {
          const tokenParsed = this.parseJwt(token)
          var fechaExp: Date = new Date(tokenParsed.exp * 1000)
          var today = new Date()
          res = fechaExp > today
        }
        return res

      }).catch((err) => console.log(err))
    }
    return res
  }

  async getIdFromToken() {
    var IdToken = 0
    var tokenPromise: Promise<string> = await this.storage.get('token')

    if (tokenPromise) {
      await this.storage.get('token').then((token) => {
        if (token) {
          const tokenParsed = this.parseJwt(token)
          IdToken = tokenParsed.Id
        }

      }).catch((err) => console.log(err))
    }
    return IdToken
  }


  async deleteToken() {
    var deleted: boolean = false
    await this.storage.remove('token').then(()=>{
      deleted = true
    })
    return deleted
  }

}
