import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {LayoutService} from "src/app/shared/services/layout/layout.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {LoginFormComponent} from "../../../iam/pages/sign-in/login-form.component";
import {MessageService} from "primeng/api";
import {SignUpComponent} from "../../../iam/pages/sign-up/sign-up.component";
import {RefDialogServiceService} from "../../../iam/services/ref-dialog-service.service";


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  visible!: boolean;
  ref!: DynamicDialogRef;

  constructor(public layoutService: LayoutService,
              public router: Router,
              public messageService: MessageService,
              public dialogService: DialogService,
              private dialogServiceService: RefDialogServiceService,
  ) {
    this.dialogServiceService.registerCompleted$.subscribe(() => {
      this.ref.close();
    });
  }

  showLogin() {
    let width = '60%';
    const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (windowWidth < 768) {
      width = '100%';
    } else if (windowWidth < 1200) {
      width = '80%';
    }
    this.ref = this.dialogService.open(LoginFormComponent, {
      width: width,
      contentStyle: {overflow: 'auto'},
      baseZIndex: 10000,

    });

    this.ref.onClose.subscribe(() => {
      this.messageService.add({severity: 'info', summary: 'Product Selected'});

    });

    this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}`});
    });
  }


  showRegister() {
    let width = '60%';
    const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (windowWidth < 768) {
      width = '100%';
    } else if (windowWidth < 1200) {
      width = '80%';
    }
    this.ref = this.dialogService.open(SignUpComponent, {
      width: width,
      contentStyle: {overflow: 'auto'},
      baseZIndex: 5000,

    });

    this.ref.onClose.subscribe(() => {
      this.messageService.add({severity: 'info', summary: 'Product Selected'});

    });

    this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}`});
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
