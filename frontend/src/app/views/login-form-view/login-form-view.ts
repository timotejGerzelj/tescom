import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginForm } from "../../components/login-form/login-form";

@Component({
  standalone: true,
  selector: 'login-form-view',
  imports: [LoginForm],
  templateUrl: './login-form-view.html',
  styleUrl: './login-form-view.css'
})
export class LoginFormView {
  
}
