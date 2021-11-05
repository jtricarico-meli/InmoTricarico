import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import { MenuPage } from '../menu/menu.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
  {
    path: '/menu',
    component: MenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
