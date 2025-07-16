import { Component } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
    password: new FormControl('', [Validators.required
    ]),
    passwordConfirm: new FormControl('', [Validators.required
    ]),
    phoneNumber: new FormControl(''),
  }, { validators: this.passwordMatchValidator() });

  protected isLoading = false;

  //Accessors for form
  get email() {
    return this.userForm.get('email')
  }
  get iban() {
    return this.userForm.get('iban')
  }
  get password() {
    return this.userForm.get('password')
  }
  get passwordConfirm() {
    return this.userForm.get('passwordConfirm')
  }
  get phoneNumber() {
    return this.userForm.get('phoneNumber')
  }

  //Custom form validator
  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {  
    const password = control.get('password')?.value;
    const passwordConfirm = control.get('passwordConfirm')?.value;
    
    return password === passwordConfirm ? null : { passwordMismatch: true };    };
  }



  async registerBtnClick() {
    const user = { ...this.userForm.value } as User;    
    this.isLoading = true;
    let passwordConfirm = this.userForm.controls['passwordConfirm'].value?.toString()
    if (passwordConfirm){
      (await this.authService.Register(user, passwordConfirm)).subscribe(
      {
        next: (data) => {
          console.log('Result!: ', data)
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Failed to load items:', err);
        }
      })
    }
  }
}
