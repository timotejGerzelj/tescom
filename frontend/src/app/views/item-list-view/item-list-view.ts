import { Component } from '@angular/core';
import { ItemList } from "../../components/item-list/item-list";

@Component({
  standalone: true,
  selector: 'item-list-view',
  imports: [ItemList],
  templateUrl: './item-list-view.html',
  styleUrl: './item-list-view.css'
})
export class ItemListView {

}
