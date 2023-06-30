import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InventoryService } from '../../services/inventory/inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
  //TODO: Delete comment
  // products!: any[];

  inventoryId!: number;
  products = [
    {
      id: 1,
      productName: 'platos',
      quantityProduct: 30,
      amount: 400,
      currency: 'soles',
      inventoryId: 1,
    },
    {
      id: 2,
      productName: 'sd',
      quantityProduct: 30,
      amount: 400,
      currency: 'soles',
      inventoryId: 1,
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private service: InventoryService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.inventoryId = params['id'];
    });

    //getAllProducts()
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
}
