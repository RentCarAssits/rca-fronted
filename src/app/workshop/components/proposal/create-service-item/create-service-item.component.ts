import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InventoryService } from 'src/app/workshop/services/inventory/inventory.service';
import { ProposalService } from 'src/app/workshop/services/proposal/proposal.service';
import { ServiceItemService } from 'src/app/workshop/services/service-item/service-item.service';
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
    private message: MessageService,
    private serviceItemService: ProposalService
  ) {
    this.proposalId = this.config.data.proposalId;
  }

  ngOnInit(): void {
    this.serviceItemForm = this.formBuilder.group({
      serviceType: ['', Validators.required],
      resources: ['', Validators.required],
      amount: ['', Validators.required],
      currency: ['', Validators.required],
    });

    //TODO: descomentar
    this.getAllServiceItem();
  }

  onSubmit() {
    if (!this.serviceItemForm.valid) return;

    let { ...rest } = this.serviceItemForm.value;
    const data = {
      ...rest,
      proposalId: this.proposalId,
    };
    this.saveData(data);
  }

  getAllServiceItem() {
    this.serviceItemService.getServiceItems(this.proposalId).subscribe(
      (response: any) => {
        this.serviceItems = response.result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  saveData(data: any) {
    this.serviceItemService.createServiceItem(this.proposalId, data).subscribe(
      (response) => {
        this.getAllServiceItem();
        this.showSuccess();
      },
      (error) => {
        console.error(error);
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
