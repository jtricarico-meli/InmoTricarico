import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

   public get(key: string) {
     return this._storage?.get(key)
   }

   public getToken(){
    return this._storage?.get('token')
  }

   public async clear(){
    return await this._storage?.clear()
  }

  public keys(){
    return this._storage?.keys()
  }

  public async length(key: string){
    return await this._storage?.length()
  }

  public async logValues(){
    const keys = await this.keys()
    for(const key of keys){
      console.log(key, await this.get(key))
    }
  }

}
