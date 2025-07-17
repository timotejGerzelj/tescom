import { ChangeDetectionStrategy, ChangeDetectorRef, Component, signal } from '@angular/core';
import { Signal } from '@angular/core';
import { Item } from '../../models/item.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ItemsService } from '../../services/items.service';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'item-list',
  imports: [CommonModule],
  templateUrl: './item-list.html',
  styleUrl: './item-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemList {
  constructor(private router: Router, private itemService: ItemsService, private authService: AuthService) {}
  
  public items = signal<Item[]>([]);  
  public isLoggedIn = signal(false);
  public isAdmin = signal(false);

  ngOnInit(): void {
    this.loadItems();
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      console.log('🧪 isLoggedIn$ emitted:', loggedIn);
      this.isLoggedIn.set(loggedIn);
      console.log(this.isLoggedIn)
    });
    this.authService.isAdmin$.subscribe((isAdmin) => {
      console.log('🧪 isAdmin$ emitted:', isAdmin);
      this.isAdmin.set(isAdmin);
      console.log(this.isAdmin)
    });
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
        }
      },
      error: (err) => {
        console.error('Failed to delete item with ID: ' + articleId, err);
      }
    });
  }
}