import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "@app/modules/auth/services/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const auth: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (auth.isLoggedIn()) {
    router.navigateByUrl('administration/product').then();
    return false;
  } else {
    return true;
  }
};
