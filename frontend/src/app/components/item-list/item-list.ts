import { ChangeDetectionStrategy, ChangeDetectorRef, Component, signal } from '@angular/core';
import { Signal } from '@angular/core';
import { Item } from '../../models/item.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ItemsService } from '../../services/items';

@Component({
  standalone: true,
  selector: 'item-list',
  imports: [CommonModule],
  templateUrl: './item-list.html',
  styleUrl: './item-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemList {
  constructor(private router: Router, private itemService: ItemsService, private cd: ChangeDetectorRef) {}
public items = signal<Item[]>([]);  public counter = signal<number>(0);
  ngOnInit(): void {
    this.loadItems();
    console.log("naloyi")
  }
  

  loadItems(): void {
    this.itemService.getItems().subscribe({
      next: (data) => {
        this.items.set(data)
      },
      error: (err) => {
        console.error('Failed to load items:', err);
      }
    });
  }

  clickNavigateEditForm(articleId: string) {
    this.router.navigate(['create-items-view', articleId]);
  }

  clickRemoveItemBtn(articleId: string) {
    console.log(articleId)
    this.itemService.deleteItem(articleId).subscribe({
      next: () => {
         if(this.items !== undefined) {
                this.items.update(items => items.filter(item => item.id !== articleId));
                this.counter.update(value => value + 1)
        }      
      },
      error: (err) => {
        console.error('Failed to delete item with ID: ' + articleId, err);
      }
    });
  }
}