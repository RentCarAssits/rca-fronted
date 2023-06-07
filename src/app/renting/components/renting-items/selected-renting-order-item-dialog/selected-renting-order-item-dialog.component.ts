import { Component, Input } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-selected-renting-order-item-dialog',
  templateUrl: './selected-renting-order-item-dialog.component.html',
  styleUrls: ['./selected-renting-order-item-dialog.component.css']
})
export class SelectedRentingOrderItemDialogComponent {
  item: any;
  rentingItem:any;
  constructor(
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.item = this.config.data.item;
  }
  ngOnInit(): void {

    this.rentingItem=this.item;
  }

}
