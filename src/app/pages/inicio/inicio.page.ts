import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private token: TokenService, private router: Router) { }

  async ngOnInit() {
    await this.delay(2000)
    
    await this.token.checkToken().then((isValidToken) => {
      if (isValidToken) {
        this.router.navigate(['/menu'])
      } else {
        this.router.navigate(['/login'])
      }
    })
  
  }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
