import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';


import { AppComponent } from './app.component';
import { CoreComponent } from './components/core/core.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { AuthService } from './services/auth.service';
import { AsignarComponent } from './components/asignar/asignar.component';
import { ConfigComponent } from './components/config/config.component';
import { ChoferesComponent } from './components/choferes/choferes.component';
import { EditChoferesComponent } from './components/edit-choferes/edit-choferes.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CoreComponent,
    ReservasComponent,
    AsignarComponent,
    ConfigComponent,
    ChoferesComponent,
    EditChoferesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule
  ],
  exports: [RouterModule],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
