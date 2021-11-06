import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginView } from '../../interfaces/LoginView';
import { UsersService } from '../../services/users.service';

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

  constructor(private usersService:UsersService) { }

  ngOnInit() {
      
  }

  async onSumbit(formulario:NgForm){
    console.log("Email: ",this.user.usuario)
    console.log("Password: ",this.user.clave)

    const token = await this.login()

    console.log("TOKEN: ", token)

    const perfil = this.getPerfil(token)

    console.log("PROPIETARIO: ",perfil)

  }

  async login(){
    return await this.usersService.login(this.user).catch(err => {
      return err
    })

  }

  async getPerfil(token: string){
    //esto va a hacer uso del service para checkear el login en el backend
    return await this.usersService.getPerfil(token).catch(err => {
      return err
    })
  }

}
