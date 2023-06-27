import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from "primeng/button";
import {PanelModule} from "primeng/panel";
import {StyleClassModule} from "primeng/styleclass";
import {DividerModule} from "primeng/divider";
import {RippleModule} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {SidebarModule} from "primeng/sidebar";
import {BadgeModule} from "primeng/badge";
import {RadioButtonModule} from "primeng/radiobutton";
import {InputSwitchModule} from "primeng/inputswitch";
import {DialogModule} from 'primeng/dialog';
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';
import {MessagesModule} from 'primeng/messages';
import {PasswordModule} from "primeng/password";
import {CheckboxModule} from "primeng/checkbox";
import {MessageService} from "primeng/api";
import {InputNumberModule} from "primeng/inputnumber";
import {InputMaskModule} from "primeng/inputmask";
import {DropdownModule} from "primeng/dropdown";
import {ChipsModule} from "primeng/chips";
import {CalendarModule} from "primeng/calendar";
import {AutoCompleteModule} from "primeng/autocomplete";
import {FormsModule} from "@angular/forms";
import {CascadeSelectModule} from "primeng/cascadeselect";
import {MultiSelectModule} from "primeng/multiselect";
import {InputTextareaModule} from "primeng/inputtextarea";
import {CardModule} from "primeng/card";
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';
import { ImageModule } from 'primeng/image';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';
import { SkeletonModule } from 'primeng/skeleton';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import {MenuModule} from "primeng/menu";
import {TableModule} from "primeng/table";
import {ChartModule} from "primeng/chart";
import { MessageModule } from 'primeng/message';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    /**PRIME-NG**/
    DividerModule,
    StyleClassModule,
    PanelModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    SidebarModule,
    BadgeModule,
    RadioButtonModule,
    InputSwitchModule,
    RippleModule,
    DialogModule,
    DynamicDialogModule,
    MessagesModule,
    PasswordModule,
    CheckboxModule,
    FormsModule,
    AutoCompleteModule,
    CalendarModule,
    ChipsModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    CascadeSelectModule,
    MultiSelectModule,
    InputTextareaModule,
    InputTextModule,
    CardModule,
    ChipModule,
    TagModule,
    ImageModule,
    GalleriaModule,
    CarouselModule,
    SkeletonModule,
    TabViewModule,
    ToastModule,
    MenuModule,
    TableModule,
    ChartModule,
    MessageModule

  ],
  exports: [
    /**PRIME-NG**/
    DividerModule,
    StyleClassModule,
    PanelModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    SidebarModule,
    BadgeModule,
    RadioButtonModule,
    InputSwitchModule,
    RippleModule,
    DialogModule,
    DynamicDialogModule,
    MessagesModule,
    PasswordModule,
    CheckboxModule,
    FormsModule,
    AutoCompleteModule,
    CalendarModule,
    ChipsModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    CascadeSelectModule,
    MultiSelectModule,
    InputTextareaModule,
    InputTextModule,
    CardModule,
    ChipModule,
    TagModule,
    ImageModule,
    GalleriaModule,
    CarouselModule,
    SkeletonModule,
    TabViewModule,
    ToastModule,
    MenuModule,
    TableModule,
    ChartModule,
    MessageModule
  ],
  providers: [
    MessageService,
    DialogService
  ]
})
export class PrimeNgModule {
}
