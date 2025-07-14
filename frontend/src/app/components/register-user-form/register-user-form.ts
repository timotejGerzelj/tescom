import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'register-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './register-user-form.html',
  styleUrl: './register-user-form.css'
})
export class RegisterUserForm {
  public userForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    taxNumber: new FormControl(''),
    password: new FormControl(''),
    phoneNumber: new FormControl(''),
    iban: new FormControl('')
  });


}
