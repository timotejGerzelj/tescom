import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'register-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './register-user-form.html',
  styleUrl: './register-user-form.css'
})
export class RegisterUserForm {
  constructor(private router: Router, private authService: AuthService) {}
  public userForm = new FormGroup({
    email: new FormControl(''),
    iban: new FormControl(''),
    password: new FormControl(''),
    passwordConfirm: new FormControl(''),
    phoneNumber: new FormControl(''),
  });

  async registerBtnClick() {
    const user = { ...this.userForm.value } as User;    
    let passwordConfirm = this.userForm.controls['passwordConfirm'].value?.toString()
    if (passwordConfirm){
      (await this.authService.Register(user, passwordConfirm)).subscribe(
      {
        next: (data) => {
          console.log('Result!: ', data)
        },
        error: (err) => {
          console.error('Failed to load items:', err);
        }
      })
    }
  }
}
