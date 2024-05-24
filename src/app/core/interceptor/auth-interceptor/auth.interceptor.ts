import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AlertService} from "@app/core/services/alert.service";
import {StorageService} from "@app/core/services/storage.service";
import {AuthService} from "@app/modules/auth/services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private _storage: StorageService,
    private _auth: AuthService,
    private _alertService: AlertService,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const refresh_token = this._storage.getItem<string>('refresh_token');
    const access_token = this._storage.getItem<string>('access_token');

    if (refresh_token && access_token) {
      request = AuthInterceptor.addTokenHeader(request, access_token);
    } else {
      // this._alertService.warning('Tiempo expirado, vuelve a iniciar sesión');
      // this._auth.logout();
    }
    return next.handle(request);
  }

  private static addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({setHeaders: {Authorization: `Bearer ${token}`}});
  }
}
