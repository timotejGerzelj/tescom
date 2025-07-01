import { Routes } from '@angular/router';
import { CreateItem } from './views/create-item/create-item';
import { ItemListView } from './views/item-list-view/item-list-view';

export const routes: Routes = [
    {path: 'create-items-view', component: CreateItem},
    {path: 'create-items-view/:itemId', component: CreateItem},
    {path: 'items-list-view', component: ItemListView},
];
