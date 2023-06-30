import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InventoryService } from '../../services/inventory/inventory.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductCreateComponent } from '../product-create/product-create.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
  //TODO: Delete comment
  // products!: any[];

  inventoryId!: number;
  // products = [
  //   {
  //     id: 1,
  //     productName: 'platos',
  //     quantityProduct: 30,
  //     amount: 400,
  //     currency: 'soles',
  //     inventoryId: 1,
  //   },
  //   {
  //     id: 2,
  //     productName: 'sd',
  //     quantityProduct: 30,
  //     amount: 400,
  //     currency: 'soles',
  //     inventoryId: 1,
  //   },
  // ];
  products!: any[];

  constructor(
    private route: ActivatedRoute,
    private service: InventoryService,
    private dialogService: DialogService,
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.inventoryId = params['id'];
    });

    this.getAllProducts()
  }

  getAllProducts() {
    this.service.getAllProducts(this.inventoryId).subscribe(
      (response: any) => {
        this.products = response.result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  createProduct(){
    let width = '60%';
    const windowWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    if (windowWidth < 768) {
      width = '100%';
    } else if (windowWidth < 1200) {
      width = '80%';
    }

    this.dialogService.open(ProductCreateComponent, {
      header: 'Create Inventory',
      width: width,
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      data: { inventoryId:this.inventoryId },
    });
  }
}
