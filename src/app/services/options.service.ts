import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Componente } from '../interfaces/components';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  constructor(private httpClient: HttpClient) { }

  getMenuOpts(){
    return this.httpClient.get<Componente[]>('../assets/options/options-menu.json')
  }
}
