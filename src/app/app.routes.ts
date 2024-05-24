import {Routes} from '@angular/router';
import {DashboardComponent} from "@app/modules/dashboard/dashboard.component";
import {MainComponent} from "@app/modules/administration/main/main.component";
import {authGuard} from "@app/core/guards/auth.guard";
import {noAuthGuard} from "@app/core/guards/no-auth.guard";
import {NotFoundComponent} from "@app/shared/layout/not-found/not-found.component";

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@app/modules/auth/auth.module').then(m => m.AuthModule),
    canActivate: [authGuard]
  },
  {
    path: 'administration',
    // loadChildren: ()=> import('@app/modules/administration/administration.module').then(m => m.AdministrationModule)
    component: MainComponent,
    canActivate: [noAuthGuard],
    children: [
      {
        path: '',
        pathMatch: "full",
        redirectTo: 'product'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [noAuthGuard]

      },
      {
        path: 'product',
        loadChildren: () => import('@app/modules/products/products.module').then(m => m.ProductsModule),
        canActivate: [noAuthGuard]
      }
    ]

  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];
