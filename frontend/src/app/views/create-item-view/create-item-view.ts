import { Component } from '@angular/core';
import { ItemForm } from '../../components/item-form/item-form';

@Component({
  standalone: true,
  selector: 'create-item',
  imports: [ItemForm],
  templateUrl: './create-item-view.html',
  styleUrl: './create-item-view.css'
})
export class CreateItem {
  
}
