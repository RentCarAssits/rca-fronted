import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {LayoutService} from "src/app/shared/services/layout/layout.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {LoginFormComponent} from "../../../iam/pages/sign-in/login-form.component";
import {MessageService} from "primeng/api";


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
              public dialogService: DialogService) {
  }

  show() {
    this.ref = this.dialogService.open(LoginFormComponent, {
      //width: 'calc(100hv- 40px)',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,

    });

    this.ref.onClose.subscribe(( ) => {
        this.messageService.add({ severity: 'info', summary: 'Product Selected'});

    });

    this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
