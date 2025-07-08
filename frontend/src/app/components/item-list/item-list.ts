import { Component } from '@angular/core';
import { Item } from '../../models/item.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ItemsService } from '../../services/items';

@Component({
  standalone: true,
  selector: 'item-list',
  imports: [CommonModule],
  templateUrl: './item-list.html',
  styleUrl: './item-list.css'
})
export class ItemList {
  constructor(private router: Router, private itemService: ItemsService) {}
  protected items: Item[] | undefined;
  ngOnInit(): void {
    this.loadItems();
  }
  

  loadItems(): void {
    this.itemService.getItems().subscribe({
      next: (data) => {
        this.items = data;
      },
      error: (err) => {
        console.error('Failed to load items:', err);
      }
    });
  }

  clickNavigateEditForm(articleId: string) {
    console.log(articleId)
    this.router.navigate(['create-items-view', articleId]);
  }
  
  clickRemoveItemBtn(articleId: string) {
    console.log(articleId)
  }


}
