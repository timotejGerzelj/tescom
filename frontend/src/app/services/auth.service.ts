import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import PocketBase from 'pocketbase';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  private pb = new PocketBase('http://127.0.0.1:8090');
  public async Login(username: string, password: string){
    console.log("Username: " + username, " Password: " + password )
    let authData = await this.pb.collection("users").authWithPassword(password, username);
    console.log(this.pb.authStore.isValid);
    console.log(this.pb.authStore.token);
    console.log(this.pb.authStore.record?.id);
  }
}