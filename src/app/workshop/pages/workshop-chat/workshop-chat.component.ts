import {Component, OnInit, ViewChild} from '@angular/core';
import {MessageModule} from 'primeng/message';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {WorkshopChatService} from "../../services/workshop-chat.service";
import {Message} from "../../models/message";
import {PlanService} from "../../../subscriptions/services/plan.service";
import {AuthService} from "../../../iam/services/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-workshop-chat',
  templateUrl: './workshop-chat.component.html',
  styleUrls: ['./workshop-chat.component.css']
})

export class WorkshopChatComponent implements OnInit {
  isOpen = false;
  loading = false;
  currentPlanBool: boolean = false;
  messages: Message[] = [];
  displayDialog: boolean = false;
  chatForm = new FormGroup({
    message: new FormControl('', [Validators.required]),
  });
  @ViewChild('scrollMe') private myScrollContainer: any;

  constructor(private messageService: WorkshopChatService,
              private planService: PlanService,
              private authService: AuthService,
              private router: Router,
  ) {
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
      this.messageService.create({prompt: sentMessage}).subscribe((response: any) => {
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

  getCurrentPlan() {
    const user: any = this.authService.getCurrentUser()
    this.planService.getCurrentPlanByUser(user.account.id).subscribe(
      (response: any) => {
        console.log(response);
        if (response.result == null) {
          this.currentPlanBool = false;
          this.displayDialog = true;
        } else {
          this.currentPlanBool = true;
          this.displayDialog = false;
        }
      },
      (error) => {
        this.currentPlanBool = false;
        console.log("No se pudo mi rey");
      }
    )
  }


  ngOnInit(): void {
    this.getCurrentPlan()
  }

  onDialogHide() {
    this.router.navigate(['/renting/vehicles-catalog']);
  }
}
