import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InventoryService } from '../../services/inventory/inventory.service';
import { WarehouseService } from '../../services/warehouse/warehouse.service';

@Component({
  selector: 'app-inventory-create',
  templateUrl: './inventory-create.component.html',
  styleUrls: ['./inventory-create.component.css'],
})
export class InventoryCreateComponent implements OnInit {
  inventoryForm!: FormGroup;
  item: any;
  // inventories = [
  //   { id:1,name: 'inventario 1', country: 'Peru', district: 'lima' },
  //   { id:2, name: 'inventario 2', country: 'Peru', district: 'lima' },
  // ];
  inventories = []
  constructor(
    private config: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
    private formBuilder: FormBuilder,
    private service: WarehouseService,
    private message: MessageService,
    private inventoryService: InventoryService
  ) {
    this.item = this.config.data.warehouseId;
  }

  ngOnInit(): void {
    this.inventoryForm = this.formBuilder.group({
      description: ['', Validators.required],
    });

    //TODO: descomentar
    this.getInventories();
  }

  getInventories() {
    this.service.getInventories(this.item).subscribe(
      (response: any) => {
        this.inventories = response.result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSubmit() {
    if (!this.inventoryForm.valid) return;

    let { ...rest } = this.inventoryForm.value;
    const data = {
      ...rest,
      country: 'Peru',
      district: 'Lima',
      addressDetail: 'Some place',
      warehouseId: this.item,
    };
    this.saveData(data);
  }

  close(){
    this.dialogRef.close();
  }

  saveData(data: any) {
    this.inventoryService.createInventory(data).subscribe(
      (response) => {
        console.log(response);
        this.showSuccess();
      },
      (error) => {
        console.error('Error', error);
        this.showError();
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
