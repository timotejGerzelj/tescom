import { Injectable } from '@angular/core';
import { PocketbaseService } from './pocketbase-service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private pbService: PocketbaseService) { 
    
  }

  getChatMessages(chatId: string, sellerId: string, buyerId: string)
  {

  }

  createNewChat(userId: string, itemId: string)
  {

  }
}
