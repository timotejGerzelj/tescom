import { Component } from '@angular/core';
import { ChatForm } from "../../components/chat-form/chat-form";
import { ChatMessages } from "../../components/chat-messages/chat-messages";

@Component({
  selector: 'negotiation-chat-view',
  imports: [ChatForm, ChatMessages],
  templateUrl: './negotiation-chat-view.html',
  styleUrl: './negotiation-chat-view.css'
})
export class NegotiationChatView {

}