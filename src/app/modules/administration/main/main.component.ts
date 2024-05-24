import {Component, WritableSignal} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {LateralMenuComponent} from "@app/shared/layout/lateral-menu/lateral-menu.component";
import {CommonModule} from "@angular/common";
import {AdministrationService} from "@app/modules/administration/services/administration.service";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterOutlet,
    LateralMenuComponent,
    CommonModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  constructor(
    private _administration : AdministrationService
  ) {
  }

  handLateralMenu : WritableSignal<boolean> = this._administration.handlerMenu;


}
