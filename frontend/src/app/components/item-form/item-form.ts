import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from '../../services/items.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Item } from '../../models/item.model';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'item-form',
  imports: [ReactiveFormsModule],
  templateUrl: './item-form.html',
  styleUrl: './item-form.css'
})
export class ItemForm {

  constructor(private router: Router, private route: ActivatedRoute, private itemService: ItemsService, private authService: AuthService) {}
  public itemForm = new FormGroup({
    name: new FormControl(''),
    quantity: new FormControl<number | null>(null),
    unitOfMeasure: new FormControl(''),
    price: new FormControl<number | null>(null),
    description: new FormControl(''),
  })
  
  protected isLoading = false;
  protected articleId: string | undefined;
  public isLoggedIn = signal(false);
  public isAdmin = signal(false);

  ngOnInit() {
    this.articleId = this.route.snapshot.paramMap.get('itemId')?.toString();
    if (this.articleId) {
        this.getItem(this.articleId)
    } else {
        this.itemForm.patchValue({      
          name:  "",      
          quantity: null,
          price: null,
          unitOfMeasure: "",
          description: ""
        });
    }
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
  
  //Accessors for form
  get name() {
    return this.itemForm.get('name')
  }
  get quantity() {
    return this.itemForm.get('quantity')
  }
  get unitOfMeasure() {
    return this.itemForm.get('unitOfMeasure')
  }
  get price() {
    return this.itemForm.get('price')
  }
  get description() {
    return this.itemForm.get('description')
  }
  //Custom form validators


  getItem(itemId: string) {
    this.itemService.getItem(itemId).subscribe({
      next: (data) => {
        this.itemForm.patchValue({      
          name:  data.name,      
          quantity: data.quantity,
          price: data.price,
          unitOfMeasure: data.unitOfMeasure,
          description: data.description
        });
      },
      error: (err) => {
        console.error('Failed to load items:', err);
      }
    });
  }

  createItem() {
    const item = { ...this.itemForm.value } as Item;    
    if (!this.articleId){
      this.itemService.postItem(item).subscribe({
        next: (res) => {
          this.router.navigate(['items-list-view']);
        },
        error: (err) => console.error('Error posting item:', err) 
      }
     );
    }
  }

  updateItem() {
    const item = { ...this.itemForm.value } as Item;    
    if (this.articleId){
      this.itemService.putItem(item, this.articleId).subscribe({
        next: (res) =>  { 
          this.router.navigate(['items-list-view']);
        },
        error: (err) => console.error('Error updating item:', err) 
      }
     );
    }
  }
}
