import { Component } from '@angular/core';
import { ChatMessage } from '../../models/chat-message.model';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'chat-messages',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './chat-messages.html',
  styleUrl: './chat-messages.css'
})
export class ChatMessages {
  public currentUserId = "user_001";
  public chatId = "chat_123";
  public userA = "user_001";
  public userB = "user_002";
  public chatMessages: ChatMessage[] = [
  {
    id: "msg_001",
    chatId: this.chatId,
    userId: this.userA,
    message: "Hey, how are you?"
  },
  {
    id: "msg_002",
    chatId: this.chatId,
    userId: this.userB,
    message: "I'm good! You?"
  },
  {
    id: "msg_003",
    chatId: this.chatId,
    userId: this.userA,
    message: "Doing well, thanks. Working on the project?"
  },
  {
    id: "msg_004",
    chatId: this.chatId,
    userId: this.userB,
    message: "Yeah, almost done. Just need to test a few things."
  },
  {
    id: "msg_005",
    chatId: this.chatId,
    userId: this.userA,
    message: "Nice! Let me know if you need help."
  },
];
}
