import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: Storage | null = null;

  constructor(private _storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this._storage.create();
    this.storage = storage;
  }


   public set(key: string, value: any){
    this.storage?.set(key,value)
   }

   public get(key: string){
     return this.storage?.get(key)
   }

   public async getToken(){
    return await this.storage?.get('token')
  }

   public async clear(){
    return await this.storage?.clear()
  }

  public async keys(){
    return await this.storage?.keys()
  }

  public async length(key: string){
    return await this.storage?.length()
  }

  public async logValues(){
    const keys = await this.keys()
    for(const key of keys){
      console.log(key, await this.get(key))
    }
  }

}
