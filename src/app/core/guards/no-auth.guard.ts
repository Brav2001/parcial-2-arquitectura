import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "@app/modules/auth/services/auth.service";
import {inject} from "@angular/core";

export const noAuthGuard: CanActivateFn = (route, state) => {
  const auth: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if(!auth.isLoggedIn()){
    router.navigateByUrl('/').then();
    return false;
  }
  return true;
};
