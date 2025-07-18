import { Routes } from '@angular/router';
import { CreateItem } from './views/create-item-view/create-item-view';
import { ItemListView } from './views/item-list-view/item-list-view';
import { NegotiationChatView } from './views/negotiation-chat-view/negotiation-chat-view';
import { LoginFormView } from './views/login-form-view/login-form-view';
import { RegisterUserView } from './views/register-user-view/register-user-view';

export const routes: Routes = [
    {path: 'create-items-view', component: CreateItem},
    {path: 'create-items-view/:itemId', component: CreateItem},
    {path: 'items-list-view', component: ItemListView},
    {path: 'negotiation-chat-view', component: NegotiationChatView},
    {path: '', component: LoginFormView},
    {path: 'register-user', component: RegisterUserView}
];
