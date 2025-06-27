import { Component } from '@angular/core';
import { ItemForm } from '../../components/item-form/item-form';

@Component({
  standalone: true,
  selector: 'app-create-item',
  imports: [ItemForm],
  templateUrl: './create-item.html',
  styleUrl: './create-item.css'
})
export class CreateItem {

}
