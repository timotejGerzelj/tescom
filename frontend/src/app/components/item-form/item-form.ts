import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from '../../services/items';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'item-form',
  imports: [ReactiveFormsModule],
  templateUrl: './item-form.html',
  styleUrl: './item-form.css'
})
export class ItemForm {

  protected articleId: string | undefined;
  constructor(private route: ActivatedRoute, private itemService: ItemsService) {}
  public itemForm = new FormGroup({
    name: new FormControl(''),
    quantity: new FormControl<number | null>(null),
    unitOfMeasure: new FormControl(''),
    price: new FormControl<number | null>(null),
    description: new FormControl(''),
  });

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
    }}

  getItem(itemId: string) {
    this.itemService.getItem(itemId).subscribe({
      next: (data) => {
        console.log(data)
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
}
