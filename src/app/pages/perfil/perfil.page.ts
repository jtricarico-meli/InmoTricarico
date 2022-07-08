import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(private usersService: UsersService, private alertController: AlertController, private toastController: ToastController) {}

  public user: User
  flagView = false

  async ngOnInit() {
    await this.usersService.getPerfil().then((res : User) => {
      this.user = res
      this.flagView = true
    })
  }

  async editarPerfil() {
    const alert = await this.alertController.create({
      header: 'Editar mi perfil',
      inputs: [
        {
          placeholder: 'Nombre',
          name: 'Nombre',
          type: 'text',
          value: this.user.nombre
        },
        {
          placeholder: 'Apellido',
          name: 'Apellido',
          type: 'text',
          value: this.user.apellido
        },
        {
          placeholder: 'Teléfono',
          name: 'Telefono',
          type: 'number',
          min: 1,
          value: this.user.telefono
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'tertiary',
        }, 
        {
          cssClass: 'tertiary',
          text: 'Guardar',
          handler: (cambios) => {
            this.user.nombre = cambios.Nombre
            this.user.apellido = cambios.Apellido
            this.user.telefono = cambios.Telefono
            this.usersService.setPerfil({
              nombre: cambios.Nombre,
              apellido: cambios.Apellido,
              telefono: cambios.Telefono,
              mail: this.user.mail,
              grupoId: this.user.grupoId,
              ID: this.user.ID
            }).then(async (res: User) => {
              this.user = res
              const toast = await this.toastController.create({
                message: 'Perfil actualizado.',
                duration: 2000
              })
              toast.present()
            })
          }
        }
      ]
    });

    await alert.present()
  }



}
