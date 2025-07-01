import { Component } from '@angular/core';
import { Item } from '../../models/item.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'item-list',
  imports: [CommonModule],
  templateUrl: './item-list.html',
  styleUrl: './item-list.css'
})
export class ItemList {
constructor(private router: Router) {}
protected mockItems: Item[] = [
  {
    id: 1,
    name: "Prenosni računalnik",
    quantityName: "kos",
    quantity: 10,
    price: 899.99,
    description: "Visoko zmogljiv prenosnik za poslovno rabo." as string,
  },
  {
    id: 2,
    name: "USB ključek 64GB",
    quantityName: "kos",
    quantity: 150,
    price: 12.49,
    description: "64GB USB 3.0 ključek primeren za hitro shranjevanje." as string,
  },
  {
    id: 3,
    name: "Ergonomski stol",
    quantityName: "kos",
    quantity: 25,
    price: 129.0,
    description: "Udoben pisarniški stol z nastavljivim naslonjalom." as string,
  },
  {
    id: 4,
    name: "Zaslon 24\"",
    quantityName: "kos",
    quantity: 40,
    price: 179.5,
    description: "Full HD LED zaslon z možnostjo stenske namestitve." as string,
  },
  {
    id: 5,
    name: "Tiskalnik HP",
    quantityName: "kos",
    quantity: 18,
    price: 249.99,
    description: "Večnamenski tiskalnik s funkcijo Wi-Fi in skenerjem." as string,
  },
  {
    id: 6,
    name: "Papir A4 - 500 listov",
    quantityName: "paket",
    quantity: 200,
    price: 4.75,
    description: "Kakovosten bel papir za vsakdanjo pisarniško rabo." as string,
  },
];

navigateEditForm(articleId: string) {
  console.log(articleId)
  this.router.navigate(['create-items-view', articleId]);
}


}
