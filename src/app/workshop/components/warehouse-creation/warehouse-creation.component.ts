import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { WarehouseService } from '../../services/warehouse/warehouse.service';
import { WorkshopService } from '../../services/workshop-s/workshop.service';
import { InventoryService } from '../../services/inventory/inventory.service';

@Component({
  selector: 'app-warehouse-creation',
  templateUrl: './warehouse-creation.component.html',
  styleUrls: ['./warehouse-creation.component.css'],
})
export class WarehouseCreationComponent implements OnInit {
  warehouseForm!: FormGroup;
  constructor(
    private dialogRef: DynamicDialogRef,
    private formBuilder: FormBuilder,
    private service: WarehouseService,
    private message: MessageService,
    private inventoryService: InventoryService,
  ) {}

  ngOnInit(): void {
    this.warehouseForm = this.formBuilder.group({
      name: ['', Validators.required],
      country: ['', Validators.required],
      district: ['', Validators.required],
      addressDetail: ['', Validators.required],
      workshopId: ['', Validators.required],
    });
  }

  onSubmit() { 
    if (!this.warehouseForm.valid) return;

    let { ...rest } = this.warehouseForm.value;
    const data = { ...rest };
    this.saveData(data);
  }

  saveData(data: any) {
    this.service.createWarehouse(data).subscribe(
      (response) => {
        console.log(response);
        this.showSuccess();
        setTimeout(() => {
          this.dialogRef.close();
        }, 1000);
      },
      (err) => {
        console.error('Error', err);
        this.showError();
        setTimeout(() => {
          this.dialogRef.close();
        }, 1000);
      }
    );
  }

  showSuccess() {
    this.message.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Operation completed successfully',
    });
  }

  showError() {
    this.message.add({
      severity: 'error',
      summary: 'Error',
      detail: 'An error occurred. Please try again.',
    });
  }
}