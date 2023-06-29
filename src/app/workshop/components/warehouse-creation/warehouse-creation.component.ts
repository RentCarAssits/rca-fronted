import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { WorkshopService } from '../../services/workshop-s/workshop.service';

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
    private service: WorkshopService,
    private message: MessageService
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

  onSubmit(){
    
  }
}
