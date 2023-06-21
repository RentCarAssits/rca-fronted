import {Component, ViewChild} from '@angular/core';
import {MessageModule} from 'primeng/message';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {WorkshopChatService} from "../../services/workshop-chat.service";
import {Message} from "../../models/message";


@Component({
  selector: 'app-workshop-chat',
  templateUrl: './workshop-chat.component.html',
  styleUrls: ['./workshop-chat.component.css']
})

export class WorkshopChatComponent {
  isOpen = false;
  loading = false;
  messages: Message[] = [];
  chatForm = new FormGroup({
    message: new FormControl('', [Validators.required]),
  });
  @ViewChild('scrollMe') private myScrollContainer: any;

  constructor(private messageService: WorkshopChatService) {
    this.messages.push({
      type: 'client',
      message: 'Hi, I am your support agent. How can I help you?',
      time: new Date(),
    });
  }

  openSupportPopup() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (this.chatForm.valid) {
      const sentMessage = this.chatForm.value.message!;
      this.loading = true;
      this.messages.push({
        type: 'user',
        message: sentMessage,
        time: new Date(),
      });
      this.chatForm.reset();
      this.scrollToBottom();
      this.messageService.sendMessage(sentMessage).subscribe((response: any) => {
        this.loading = false;
        this.messages.push({
          type: 'client',
          message: response.message,
          time: new Date(),
        });
        this.scrollToBottom();
      });
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      try {
        this.myScrollContainer.nativeElement.scrollTop =
          this.myScrollContainer.nativeElement.scrollHeight + 500;
      } catch (err) {
      }
    }, 150);
  }

}
