import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {ServiceRequestService} from "../../../services/service-request.service";
import {MessageService} from "primeng/api";
import {AuthService} from "../../../../iam/services/auth.service";
import {DiagnosticService} from "../../../services/diagnostic/diagnostic.service";

@Component({
  selector: 'app-create-diagnostic',
  templateUrl: './create-diagnostic.component.html',
  styleUrls: ['./create-diagnostic.component.css']
})
export class CreateDiagnosticComponent {
  diagnosticForm!: FormGroup;
  user:any;
  serviceRequestItem: any;
  constructor(
    private dialogRef: DynamicDialogRef,
    private formBuilder: FormBuilder,
    private service: DiagnosticService,
    private serviceRequest: ServiceRequestService,
    private message: MessageService,
    private authService:AuthService,
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.diagnosticForm = this.formBuilder.group({

      diagnosticDescription: ['', Validators.required],
    });
  }

  onSubmit() {
    if (!this.diagnosticForm.valid) return;

    let { ...rest } = this.diagnosticForm.value;

    const serviceRequestId = localStorage.getItem('serviceRequestIdDiagnostic')
    console.log(serviceRequestId)
    this.serviceRequest.getById(serviceRequestId).subscribe( (response) =>{
      this.serviceRequestItem = response.result;
      const data = {
        ...rest,
        mechanicId: this.user.id,
        ownerId: this.serviceRequestItem.ownerId,
        vehicleId: this.serviceRequestItem.vehicleId
      };
      console.log(data)
      this.saveData(data);
    })

  }

  saveData(data: any) {
    this.service.create(data).subscribe(
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
    window.location.reload();
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
