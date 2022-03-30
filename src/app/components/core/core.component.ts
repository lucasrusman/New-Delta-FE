import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
})
export class CoreComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
  @Output() public sidenavToggle = new EventEmitter();
  constructor(private router: Router) {}

  ngOnInit(): void {}

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  goToHomePage(){
    this.router.navigateByUrl('/newdelta/home');
    this.onSidenavClose()
  }

  goToBookingPage() {
    this.router.navigateByUrl('/newdelta/reservas');
    this.onSidenavClose()
  }

  logout() {
    this.router.navigateByUrl('/');
    this.onSidenavClose()
  }
}
