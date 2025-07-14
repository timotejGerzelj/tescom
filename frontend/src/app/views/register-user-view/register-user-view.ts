import { Component } from '@angular/core';
import { RegisterUserForm } from "../../components/register-user-form/register-user-form";

@Component({
  selector: 'register-user-view',
  imports: [RegisterUserForm],
  templateUrl: './register-user-view.html',
  styleUrl: './register-user-view.css'
})
export class RegisterUserView {

}
