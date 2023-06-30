import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent implements OnInit {
  productForm!: FormGroup;
  // {
  //       id: 1,
  //       productName: 'platos',
  //       quantityProduct: 30,
  //       amount: 400,
  //       currency: 'soles',
  //       inventoryId: 1,
  //     }
  inventoryId: any;
  constructor(
    private dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private message: MessageService,
    private productService: ProductService
  ) {
    this.inventoryId = this.config.data.inventoryId;
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      quantityProduct: ['', Validators.required],
      amount: ['', Validators.required],
      currency: ['', Validators.required],
    });
  }

  onSubmit() {
    if (!this.productForm.valid) return;

    let { ...rest } = this.productForm.value;
    const data = { ...rest, inventoryId: this.inventoryId };
    this.saveData(data);
  }

  saveData(data: any) {
    this.productService.createProduct(data).subscribe(
      (response) => {
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
