import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private router:Router, private token: TokenService){}

  async canLoad(route: Route, segments: UrlSegment[]) {
    //verificar si el usuario esta logueado
		//si no esta logueado redireccionar al login
		const token = await this.token.getToken();
		if (token != null) {
			return true;
		}
		else {
			this.router.navigate(['/login']);
			return false;  
    }
  
  }
}
