import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


  @Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
  })
export class LoginComponent implements OnInit {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  public showPassword: boolean = false;

  isLoading = false;
  private isAuthenticated = false;
  private token: any;
  private id: any;
  private tokenTimer: any;
  error: boolean = false
  private authStatusListener = new Subject<boolean>();

  matcher = new MyErrorStateMatcher();
  constructor(private router: Router, private authService : AuthService) {}

  ngOnInit(): void {
    this.autoAuthUser();
  }

  getToken() {
    return this.token;
  }

  getId() {
    return this.id;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  goToReservasPage() {
    this.router.navigateByUrl('/newdelta/reservas');
  }
  getIsAuth() {
    return this.isAuthenticated;
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.id = authInformation.id
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  onLogin(form: NgForm) {
    if (this.isAuthenticated) {
      this.error = false;
    } else {
      this.error = true;
    }
    if (form.invalid) {
      return;
    }
    this.authService.postLogin(form.value.email, form.value.password);
  }

  logout() {
    this.token = null;
    this.id = null
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate([""]);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.authService.logout()
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, id: any) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("id", id);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("id");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const id = localStorage.getItem("id")
    if (!token || !expirationDate || !id) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      id: id
    }
  }
}
