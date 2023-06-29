import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormGroup } from '@angular/forms';
import { WarehouseCreationComponent } from '../warehouse-creation/warehouse-creation.component';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css'],
})
export class WarehouseComponent implements OnInit {
  workshopId = 0;
  ref!: DynamicDialogRef;
  workshopItemForm!: FormGroup;
  //testing data
  warehouses = [
    {
      id: 1,
      name: 'hola',
      country: 3,
      district: 'san miguel',
      addressDetail: 'la marina',
      workshopId: this.workshopId,
    },
    {
      id: 2,
      name: 'hola',
      country: 3,
      district: 'san miguel',
      addressDetail: 'la marina',
      workshopId: this.workshopId,
    },
  ];
  constructor(private route: ActivatedRoute, private dialogService: DialogService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.workshopId = params['id'];
    });

    //get all by warehouse Id
  }

  createWarehouse() {let width = '60%';
  const windowWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  if (windowWidth < 768) {
    width = '100%';
  } else if (windowWidth < 1200) {
    width = '80%';
  }

  this.dialogService.open(WarehouseCreationComponent, {
    header: 'Create WorkShop',
    width: width,
    contentStyle: { overflow: 'auto' },
    baseZIndex: 10000,
  });}
}
