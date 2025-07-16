import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private apiUrl = 'http://127.0.0.1:8090/'
  constructor(private http: HttpClient) { }
  
  getItems(): Observable<Item[]> {
      return this.http.get<any[]>(this.apiUrl + 'items/').pipe(
      map(items =>
        items.map(item => ({
          id: item.id,
          name: item.name,
          unitOfMeasure: item.unit_of_measure,
          quantity: item.quantity,
          price: item.price,
          description: item.description,
        }))
      )
    );
  }

  getItem(itemId: string): Observable<Item> {
      return this.http.get<Item>(this.apiUrl + 'items/' + itemId)
  }

  postItem(item: Item): Observable<Item> {
    const payload = {
      name: item.name,
      unit_of_measure: item.unitOfMeasure,
      quantity: item.quantity,
      price: item.price,
      description: item.description
    };
    return this.http.post<Item>(this.apiUrl + "items/create", payload)
  }

  putItem(item: Item, itemId: string): Observable<Item> {
    return this.http.put<Item>(this.apiUrl + "items/" + itemId, item)
  }

  deleteItem(itemId: string): Observable<Item> {
    return this.http.delete<Item>(this.apiUrl + "items/" + itemId)
  }
}