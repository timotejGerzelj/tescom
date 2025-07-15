import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import PocketBase, { RecordModel } from 'pocketbase';
import { User } from "../models/user.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
    private apiUrl = 'http://127.0.0.1:8090/'

  private pb = new PocketBase(this.apiUrl);

  public async Login(username: string, password: string)
  {
    await this.pb.collection("users").authWithPassword(password, username);
    console.log(this.pb.authStore.isValid);
    console.log(this.pb.authStore.token);
    console.log(this.pb.authStore.record?.id);
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
}