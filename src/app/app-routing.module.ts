import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { CoreComponent } from './components/core/core.component';
import { ReservasComponent } from './components/reservas/reservas.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'newdelta',
    component: CoreComponent,
    children: [
      { path: 'reservas', component: ReservasComponent  },
    ],
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
