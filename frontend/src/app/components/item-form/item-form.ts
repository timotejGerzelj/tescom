import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'item-form',
  imports: [],
  templateUrl: './item-form.html',
  styleUrl: './item-form.css'
})
export class ItemForm {

  protected articleId: string | undefined;
  constructor(private route: ActivatedRoute) {}
ngOnInit() {
    this.articleId = this.route.snapshot.paramMap.get('itemId')?.toString();

    if (this.articleId) {
      console.log('Edit mode, ID:', this.articleId);
    } else {
      console.log('Create mode');
    }}
}
