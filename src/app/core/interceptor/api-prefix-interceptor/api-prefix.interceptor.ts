import {Inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DOCUMENT} from "@angular/common";

@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {

  constructor(
    @Inject(DOCUMENT) document: any
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // let api_url: string = request.url;
    // if (request.url !== 'https://api.ipify.org?format=json') {
    //     api_url = document.location.origin + request.url;
    // }
    const urlRequest = request.clone({
      // url: environment.api + request.url
    });
    return next.handle(urlRequest);
  }
}
