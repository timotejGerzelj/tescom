import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { BehaviorSubject, Observable } from "rxjs";
import { PocketbaseService } from "./pocketbase-service";
import PocketBase from 'pocketbase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private pbService: PocketbaseService) { 
    console.log(pbService)
    const pb = pbService.pb;
    pb.authStore.onChange(() => {
      this.isLoggedIn$.next(pb.authStore.isValid);
    });
  }


  public isLoggedIn$ = new BehaviorSubject<boolean>(false);
  public isAdmin$ = new BehaviorSubject<boolean>(false)

  public async Login(username: string, password: string) : Promise<boolean>
  {
    try {
      const pb = this.pbService.pb;
      await pb.collection("users").authWithPassword(password, username);
      console.log(pb.authStore.isValid);
      console.log(pb.authStore.token);
      console.log(pb.authStore.record?.id);
      if (pb.authStore.isValid) {
        const user = pb.authStore.record;
        this.isLoggedIn$.next(true);
        if (user)
        {
          this.isAdmin$.next(user['role'])
        }
      }
      console.log(this.isLoggedIn$)
      return pb.authStore.isValid;
    }
    catch (error: any) {
      console.error("Login failed:", error?.message || error);
      return false;
    }
  }

  public async Register(user: User, passwordConfirm: string): Promise<Observable<User>>
  {
    const pb = this.pbService.pb;
    return  await pb.collection('users').create({
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: false,
      iban: user.iban,
      password: user.password,
      passwordConfirm: passwordConfirm,
    });
  }

  Logout() {
    const pb = this.pbService.pb;
    pb.authStore.clear();
    this.isLoggedIn$.next(false);
    this.isAdmin$.next(false);

  }

}