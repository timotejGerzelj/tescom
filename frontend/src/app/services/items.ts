import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private apiUrl = 'http://localhost:8080'
  constructor(private http: HttpClient) { }
  
  getItems(): Observable<Item[]> {
      return this.http.get<Item[]>(this.apiUrl + '/items')
  }

  getItem(itemId: string): Observable<Item> {
      return this.http.get<Item>(this.apiUrl + '/items/' + itemId)
  }

  postItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.apiUrl + "/items", item)
  }

  putItem(item: Item, itemId: string): Observable<Item> {
    return this.http.put<Item>(this.apiUrl + "/items/" + itemId, item)
  }
}