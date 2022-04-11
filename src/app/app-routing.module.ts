import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './components/auth/login/auth.guard';
import { CoreComponent } from './components/core/core.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ConfigComponent } from './components/config/config.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'newdelta',
    component: CoreComponent, canActivate: [AuthGuard],
    children: [
      { path: 'reservas', component: ReservasComponent, canActivate: [AuthGuard]  },
      { path: 'configuraciones', component: ConfigComponent, canActivate: [AuthGuard]  },
    ],
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
