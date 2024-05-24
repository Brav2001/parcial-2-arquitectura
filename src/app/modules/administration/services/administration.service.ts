import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

  handlerMenu: WritableSignal<boolean>= signal(true);


  constructor() { }
}
