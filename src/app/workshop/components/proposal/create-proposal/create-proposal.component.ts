import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../iam/services/auth.service';
import { ProposalService } from 'src/app/workshop/services/proposal/proposal.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-create-proposal',
  templateUrl: './create-proposal.component.html',
  styleUrls: ['./create-proposal.component.css'],
})
export class CreateProposalComponent implements OnInit {
  proposalForm!: FormGroup;
  user = this.authService.getCurrentUser();
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private dialogRef: DynamicDialogRef,
    private service: ProposalService,
    private message: MessageService
  ) {}

  ngOnInit(): void {
    this.proposalForm = this.formBuilder.group({
      humanResources: ['', Validators.required],
      amount: ['', Validators.required],
      currency: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
    });
  }

  onSubmit() {
    if (!this.proposalForm.valid) return;

    let { ...rest } = this.proposalForm.value;
    const data = { ...rest };
    this.saveData(data);
  }

  saveData(data: any) {
    this.service.createProposal(data).subscribe((response) => {
      console.log(response);
      this.showSuccess();
      setTimeout(() => {
        this.dialogRef.close();
      }, 1000);
    }, error => {
      console.error(error);
      this.showError();
      setTimeout(() => {
        this.dialogRef.close();
      }, 1000);
    });
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
