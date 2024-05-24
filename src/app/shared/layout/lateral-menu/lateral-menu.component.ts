import {Component} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {AdministrationService} from "@app/modules/administration/services/administration.service";
import {AuthService} from "@app/modules/auth/services/auth.service";

@Component({
  selector: 'app-lateral-menu',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive,
    CommonModule
  ],
  templateUrl: './lateral-menu.component.html',
  styleUrl: './lateral-menu.component.scss'
})
export class LateralMenuComponent {

  closeMenu = this._administration.handlerMenu;

  constructor(
    private _administration: AdministrationService,
    private _auth: AuthService,
  ) {
  }

  closeLateralMenu() {
    this.closeMenu.update(() => true)
  }

  openLateralMenu(): void {
    this.closeMenu.update(()=> false)
  }

  logOut(){
    this._auth.logout();
  }
}
