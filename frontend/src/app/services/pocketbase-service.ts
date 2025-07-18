import { Injectable } from '@angular/core';
import PocketBase, { RecordModel } from 'pocketbase';

@Injectable({
  providedIn: 'root'
})
export class PocketbaseService {
  private apiUrl = 'http://127.0.0.1:8090/'
  public pb = new PocketBase(this.apiUrl);

  constructor() { }
}
