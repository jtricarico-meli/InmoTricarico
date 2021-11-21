import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Componente } from './interfaces/components';
import { OptionsService } from './services/options.service';
import { StorageService } from './services/storage.service';
import { TokenService } from './services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public botones :Observable<Componente[]>

  constructor(private optsSrv: OptionsService, private storage:StorageService, private loadingController:LoadingController, private tokenService: TokenService, private router:Router) { }

  ngOnInit() {
    this.botones = this.optsSrv.getMenuOpts()
    this.storage.init()
  }

  async logOut(){
    const loading = await this.loadingController.create({
      message: 'Cerrando sesión',
      duration: 1000
    });
    await loading.present();
    await this.tokenService.deleteToken().then((res) => {
      if (res) {
        this.router.navigate(['/inicio'])
      }
    })

   
  }
}
