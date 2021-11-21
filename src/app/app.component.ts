import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Componente } from './interfaces/components';
import { OptionsService } from './services/options.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public botones :Observable<Componente[]>

  constructor(private optsSrv: OptionsService, private storage:StorageService) { }

  ngOnInit() {
    this.botones = this.optsSrv.getMenuOpts()
    this.storage.init()
  }
}
