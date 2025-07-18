import { Routes } from '@angular/router';
import { CreateItem } from './views/create-item-view/create-item-view';
import { ItemListView } from './views/item-list-view/item-list-view';
import { NegotiationChatView } from './views/negotiation-chat-view/negotiation-chat-view';

export const routes: Routes = [
    {path: 'create-items-view', component: CreateItem},
    {path: 'create-items-view/:itemId', component: CreateItem},
    {path: 'items-list-view', component: ItemListView},
    {path: 'negotiation-chat-view/:itemId', component: NegotiationChatView}
];
