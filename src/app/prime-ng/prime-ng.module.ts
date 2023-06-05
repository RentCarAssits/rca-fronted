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
  ],
  providers: []
})
export class PrimeNgModule {
}
