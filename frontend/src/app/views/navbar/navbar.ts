import { Component, inject, signal, Signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  constructor(private router: Router, public authService: AuthService) {}

  public isLoggedIn = signal(false);
  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      console.log('🧪 isLoggedIn$ emitted:', loggedIn);
      this.isLoggedIn.set(loggedIn);
      console.log(this.isLoggedIn)
    });

  }

  logoutBtnClicked() {
    this.authService.Logout()
  }


}
