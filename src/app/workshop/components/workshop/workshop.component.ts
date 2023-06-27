import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateRentingItemComponent } from 'src/app/renting/components/renting-items/create-renting-item/create-renting-item.component';
import { CreateWorkshopItemComponent } from '../create-workshop-item/create-workshop-item.component';

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.css'],
})
export class WorkshopAComponent implements OnInit {
  // workshops!: any[]
  // workshops = [
  //   { id: 1, name: 'hola', ownerId: 3, address: 'la marina' },
  //   { id: 2, name: 'hey', ownerId: 4, address: 'la marina' },
  // ];
  car: any;
  workshops = [];
  ref!: DynamicDialogRef;
  workshopItemForm !: FormGroup;

  constructor(private dialogService:DialogService){}
  ngOnInit(): void {}

  createWorkshop() {
    let width = '60%';
    const windowWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    if (windowWidth < 768) {
      width = '100%';
    } else if (windowWidth < 1200) {
      width = '80%';
    }

    this.dialogService.open(CreateWorkshopItemComponent, {
      header: 'Create WorkShop',
      width: width,
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000
    });
  }
}
