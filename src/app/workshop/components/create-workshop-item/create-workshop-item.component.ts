import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CloudinaryService } from 'src/app/shared/services/cloudinary/cloudinary.service';
import { WorkshopService } from '../../services/workshop-s/workshop.service';
import { AuthService } from '../../../iam/services/auth.service';

@Component({
  selector: 'app-create-workshop-item',
  templateUrl: './create-workshop-item.component.html',
  styleUrls: ['./create-workshop-item.component.css'],
})
export class CreateWorkshopItemComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;

  workshopForm!: FormGroup;
  user = this.authService.getCurrentUser();

  constructor(
    private ref: DynamicDialogRef,
    private authService: AuthService,
    private cloudinaryService: CloudinaryService,
    private dialogRef: DynamicDialogRef,
    private formBuilder: FormBuilder,
    private service: WorkshopService,
    private message: MessageService
  ) {}

  ngOnInit(): void {
    this.workshopForm = this.formBuilder.group({
      name: ['', Validators.required],
      country: ['', Validators.required],
      district: ['', Validators.required],
      addressDetail: ['', Validators.required],
      mechanicId: ['', Validators.required],
    });
  }

  onSubmit() {
    if (!this.workshopForm.valid) return;

    let { ...rest } = this.workshopForm.value;

    const data = { ...rest, mechanicId: this.user?.id };
    console.log(data);
    this.saveData(data);
  }

  saveData(data: any) {
    this.service.createWorkshop(data).subscribe(
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
