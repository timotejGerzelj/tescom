import { Component, inject, signal, Signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  constructor(public authService: AuthService) {}

  public isLoggedIn = signal(false);
  public showUserMenu = false;

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      console.log('🧪 isLoggedIn$ emitted:', loggedIn);
      this.isLoggedIn.set(loggedIn);
      console.log(this.isLoggedIn)
    });

  }

  logoutBtnClicked() {
    console.log("click")
    this.authService.Logout()
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

}
