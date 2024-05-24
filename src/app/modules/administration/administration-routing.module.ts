import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  //Revisa porque no sirve aquí
  // {
  //   path: '',
  //   component: MainComponent,
  //   children: [
  //     {
  //       path: 'dashboard',
  //       component: DashboardComponent
  //     }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule {
}
