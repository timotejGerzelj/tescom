import { Injectable } from "@angular/core";
import PocketBase, { RecordModel } from 'pocketbase';
import { User } from "../models/user.model";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { 
    this.pb.authStore.onChange(() => {
      this.isLoggedIn$.next(this.pb.authStore.isValid);
    });
  }


  private apiUrl = 'http://127.0.0.1:8090/'
  public pb = new PocketBase(this.apiUrl);
  public isLoggedIn$ = new BehaviorSubject<boolean>(this.pb.authStore.isValid);

  public async Login(username: string, password: string) : Promise<boolean>
  {
    try {
      await this.pb.collection("users").authWithPassword(password, username);
      console.log(this.pb.authStore.isValid);
      console.log(this.pb.authStore.token);
      console.log(this.pb.authStore.record?.id);
      this.isLoggedIn$.next(true);
      console.log(this.isLoggedIn$)
      return this.pb.authStore.isValid;
    }
    catch (error: any) {
      console.error("Login failed:", error?.message || error);
      return false;
    }
  }

  public async Register(user: User, passwordConfirm: string): Promise<Observable<User>>
  {
    return  await this.pb.collection('users').create({
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: false,
      iban: user.iban,
      password: user.password,
      passwordConfirm: passwordConfirm,
    });
  }

  Logout() {
    this.pb.authStore.clear();
    this.isLoggedIn$.next(false);
  }

}