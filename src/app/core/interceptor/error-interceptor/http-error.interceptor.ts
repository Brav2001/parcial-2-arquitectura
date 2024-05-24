// import { Injectable } from '@angular/core';
// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
// import { catchError, Observable, throwError } from 'rxjs';
//
// import { Location } from '@angular/common';
// import { LoadingService } from '@app/core/services/loading.service';
// import { Router } from '@angular/router';
// import { MatDialog } from '@angular/material/dialog';
// import { NGXLogger } from 'ngx-logger';
// import {AlertService} from "@app/core/services/alert.service";
// import {PermissionPipe} from "@app/shared/layouts/pipes/permission.pipe";
// import {FieldPipe} from "@app/shared/layouts/pipes/field.pipe";
// import {AuthenticationService} from "@app/modules/auth/services/authentication.service";
//
// @Injectable()
// export class HttpErrorInterceptor implements HttpInterceptor {
//
//   private field: FieldPipe = new FieldPipe();
//   private permission: PermissionPipe = new PermissionPipe();
//
//   constructor(
//     private _auth: AuthenticationService,
//     private _location: Location,
//     private _alert: AlertService,
//     private _loader: LoadingService,
//     private _router: Router,
//     private logger: NGXLogger,
//     public dialog: MatDialog,
//   ) {
//   }
//
//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     return next.handle(request).pipe(
//       catchError((error) => {
//         this.logger.error(error);
//         this._loader.hide();
//         this._loader.hideLoaderTable();
//         if (error.url !== 'https://api.ipify.org?format=json') {
//           switch (error.status) {
//             case 400: {
//               if (error.error['field'] !== undefined) {
//                 this._alert.error(this.field.transform(error.error['field'], error.error[0].message));
//               } else {
//                 if (error.error.length) {
//                   if (error.error[0].field !== undefined) {
//                     this._alert.error(this.field.transform(error.error[0].field, error.error[0].message));
//                   } else {
//                     this._alert.error(error.error.message);
//                   }
//                 } else {
//                   this._alert.error(error.error.message);
//                 }
//               }
//               break;
//             }
//             case 401: {
//               if (error.url.indexOf('/auth') !== -1 && error.url.indexOf('/auth/v1/refresh_token') === -1) {
//                 this._alert.warning(error.error.message);
//                 if (error.error.indexOf('Usuario bloqueado') !== -1) {
//                   this.dialog.closeAll();
//                 }
//               }
//               break;
//             }
//             case 404: {
//               this._alert.error(error.error.message);
//               break;
//             }
//             case 403: {
//               if (error.error['permission_name'] !== undefined) {
//                 this._alert.warning('No tienes permiso para la funcionalidad "' + this.permission.transform(error.error.permission_name) + '"');
//               } else {
//                 if (this._auth.isLoggedIn()) {
//                   this._auth.logout();
//                   this.dialog.closeAll();
//                   this._alert.warning('Petición invalida, por seguridad inicia sesión nuevamente');
//                 } else {
//                   this.dialog.closeAll();
//                   this._alert.warning('Petición invalida, reintenta nuevamente por favor');
//                 }
//               }
//               break;
//             }
//             case 418: {
//               break;
//             }
//             case 500: {
//               this._alert.error('Tenemos problemas, reintenta mas tarde...');
//               break;
//             }
//             case 504: {
//               break;
//             }
//             default: {
//               this._alert.error('Tenemos problemas, reintenta mas tarde...');
//             }
//           }
//         }
//         return throwError(error);
//       })
//     );
//   }
// }
