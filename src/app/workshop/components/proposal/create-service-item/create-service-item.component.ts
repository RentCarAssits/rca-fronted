import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InventoryService } from 'src/app/workshop/services/inventory/inventory.service';
import { WarehouseService } from 'src/app/workshop/services/warehouse/warehouse.service';

@Component({
  selector: 'app-create-service-item',
  templateUrl: './create-service-item.component.html',
  styleUrls: ['./create-service-item.component.css'],
})
export class CreateServiceItemComponent implements OnInit {
  serviceItemForm!: FormGroup;
  proposalId: any;
  serviceItems = [{ id: 1 }, { id: 2 }];

  // servicesItems = []

  constructor(
    private config: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
    private formBuilder: FormBuilder,
    private router: Router,
    private service: WarehouseService,
    private message: MessageService,
    private inventoryService: InventoryService
  ){
    this.proposalId = this.config.data.proposalId;
  };

  ngOnInit(): void {
      this.serviceItemForm = this.formBuilder.group({
        
      })
  }
}
