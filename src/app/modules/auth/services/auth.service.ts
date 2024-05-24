import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthLogin, AuthResponse} from "@app/modules/auth/interfaces/auth";
import {StorageService} from "@app/core/services/storage.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http: HttpClient,
    private _storage: StorageService,
    private _router: Router
  ) {
  }

  public login(data: AuthLogin): Observable<AuthResponse> {
    return this._http.post<AuthResponse>('https://api.escuelajs.co/api/v1/auth/login', data)
  }

  public logout(): void {
    this._storage.removeAll();
    this._router.navigateByUrl('/').then();
  }

  isLoggedIn(): boolean {
    const token = this._storage.getItem('access_token');
    return (token !== '');
  }

}
