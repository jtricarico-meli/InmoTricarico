import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.imagen ={
      src : "../assets/icon/fav-icon-inmo.png",
      width : "50",
      height : "50"
    } 

    this.formData = new FormGroup({
      user: new FormControl(),
      pass: new FormControl()
    })
  }

  private imagen: any

  private formData: FormGroup

  onSumbit(){
    console.log("Email: ",this.formData.value.user)
    console.log("Password: ",this.formData.value.pass)
    if(this.checkLogin()){
      this.router.navigate(['menu'])
    }
  }

  checkLogin(){
    //esto va a hacer uso del service para checkear el login en el backend
    return true
  }

}
