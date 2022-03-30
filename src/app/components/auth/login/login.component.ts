import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { AuthService } from '../auth.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  public showPassword: boolean = false;

  isLoading = false;

  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, public authService: AuthService) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  ingresar() {
    this.router.navigateByUrl('newdelta/home')
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);
    this.ingresar()
    ;
  }
}
