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

   public clear(){
    return this.storage?.clear()
  }

  public keys(){
    return this.storage?.keys()
  }

  public length(key: string){
    return this.storage?.length()
  }

  public async logValues(){
    const keys = await this.keys()
    for(const key of keys){
      console.log(key, await this.get(key))
    }
  }

}
