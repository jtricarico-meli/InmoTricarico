import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { LoginView } from '../../interfaces/LoginView';
import { UsersService } from '../../services/users.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user : LoginView = {
    usuario: '',
    clave: ''
  }

  constructor(private usersService:UsersService, private tokenService:TokenService, private router:Router, private loadingController: LoadingController) { }

  ngOnInit() {
    if(this.tokenService.getToken()){
      this.router.navigate(['/menu'])
    }
  }

  async onSumbit(formulario:NgForm){
    const loading = await this.loadingController.create({
      message: 'Iniciando sesión',
      duration: 500
    });
    await loading.present();
    await loading.onDidDismiss();
    const token = await this.login()
    console.log(token)

    if(token){
      this.router.navigate(['/menu'])
    }
    else{
      
    }
    

  }

  async login(){
    return await this.usersService.login(this.user).catch(err => {
      return null
    })

  }

  async getPerfil(){
    //esto va a hacer uso del service para checkear el login en el backend
    return await this.usersService.getPerfil().catch(err => {
      return err
    })
  }

}
