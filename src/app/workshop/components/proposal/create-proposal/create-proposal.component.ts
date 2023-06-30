import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {ServiceRequestService} from "../../../services/service-request.service";
import {MessageService} from "primeng/api";
import {AuthService} from "../../../../iam/services/auth.service";

@Component({
  selector: 'app-create-proposal',
  templateUrl: './create-proposal.component.html',
  styleUrls: ['./create-proposal.component.css']
})
export class CreateProposalComponent {
  proposalForm!: FormGroup;
  user:any;
  constructor(
    private dialogRef: DynamicDialogRef,
    private formBuilder: FormBuilder,
    private service: ServiceRequestService,
    private message: MessageService,
    private authService:AuthService,
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.proposalForm = this.formBuilder.group({
      vehicleName: ['', Validators.required],
      vehicleId: ['', Validators.required],
      year: ['', Validators.required],
      workshopId: ['', Validators.required],
      descriptionProblems: ['', Validators.required],
    });
  }

  onSubmit() {
    if (!this.proposalForm.valid) return;

    let { ...rest } = this.proposalForm.value;
    console.log(this.proposalForm.value)
    const data = {
      ...rest,
      vehicleIntegrity: "maintenance",
      ownerId: this.user.id
    };
    this.saveData(data);
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
