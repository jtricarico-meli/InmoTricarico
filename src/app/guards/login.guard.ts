import { Injectable } from '@angular/core';
import { CanLoad, Router, Route, UrlSegment, UrlTree } from '@angular/router';
import { TokenService } from '../services/token.service';
import { UsersService } from '../services/users.service';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanLoad {

  constructor(private router:Router, private storage: StorageService){}

  async canLoad(route: Route, segments: UrlSegment[]): Promise<boolean | UrlTree> {
    const token = await this.storage.getToken()
    console.log(token)
    if (token!=null){
      console.log('hay token')
      this.router.navigate(['/menu'])
      return false
    }
    console.log('no hay token')
    return true  
  }
}
