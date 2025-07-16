import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css'
})
export class LoginForm {
  constructor(private router: Router, private authService: AuthService) {}
  
  protected isLoading = false;
  public itemForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });


  loginBtnClick() {
    var password = this.itemForm.get('password')?.value?.toString()
    var username = this.itemForm.get('username')?.value?.toString()
    if (password != undefined && username != undefined) {
      this.authService.Login(password, username)
    }
  }
}
