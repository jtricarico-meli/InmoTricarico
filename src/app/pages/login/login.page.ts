import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { LoginView } from '../../interfaces/LoginView';
import { UsersService } from '../../services/users.service';
import { TokenService } from '../../services/token.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: LoginView = {
    mail: '',
    password: ''
  }

  constructor(private usersService: UsersService, private token: TokenService, private router: Router, private loadingController: LoadingController, private toastController:ToastController) { }

  async ngOnInit() {
    await this.token.checkToken().then((isValidToken) => {
      if (isValidToken) {
        this.router.navigate(['/menu'])
      }
    })
  }

  async onSumbit(formulario: NgForm) {
    const loading = await this.loadingController.create({
      message: 'Iniciando sesión',
      duration: 1000
    });
    await loading.present();
    await loading.onDidDismiss();
    const [token, err] = await this.login()
    console.log(token)

    if (token) {
      this.router.navigate(['/menu'])
    }
    else {
      console.log(err)
      const toast = await this.toastController.create({
        message: err,
        duration: 5000
      })
      toast.present()
    }
    
  }

  async login() {
    var error: any
    var token: any
    await this.usersService.login(this.user).then((res)=>{
      token = res
    }).catch(err => {
      console.log(err)
      error = err
    })

    return [token, error]


  }

  async getPerfil() {
    //esto va a hacer uso del service para checkear el login en el backend
    return await this.usersService.getPerfil().catch(err => {
      return err
    })
  }

}
