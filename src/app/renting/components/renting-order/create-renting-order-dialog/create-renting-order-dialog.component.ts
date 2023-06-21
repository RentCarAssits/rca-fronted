import { Component } from '@angular/core';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {CarService} from "../../../services/car/car.service";
import {MessageService} from "primeng/api";
import {RentingOrderService} from "../../../services/renting-orders/renting-order.service";
import {AuthService} from "../../../../iam/services/auth.service";

@Component({
  selector: 'app-create-renting-order-dialog',
  templateUrl: './create-renting-order-dialog.component.html',
  styleUrls: ['./create-renting-order-dialog.component.css']
})
export class CreateRentingOrderDialogComponent {
  item: any;
  rentingItem:any;
  car:any;
  imageLoaded=false;
  user = this.authService.getCurrentUser();
  constructor(
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private carService:CarService,
    private rentOrderService:RentingOrderService,
    private dialogService:DialogService,
    private authService:AuthService,
    private message: MessageService
  ) {
    this.item = this.config.data.item;
  }
  ngOnInit(): void {
    this.rentingItem=this.item;
    console.log("🚀 ~ file: selected-renting-order-item-dialog.component.ts:23 ~ SelectedRentingOrderItemDialogComponent ~ ngOnInit ~ this.rentingItem:", this.rentingItem)
    this.getCarById(this.rentingItem?.vehicleId);

  }
  getCarById(id:number){
    this.carService.getById(id).subscribe(
      data => {
        console.log(data);
        this.car = data.result; // Asigna los datos del JSON a la variable cars
        this.imageLoaded=true;
      }
    )
  }
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero if needed
    const day = ('0' + date.getDate()).slice(-2); // Add leading zero if needed
    return `${year}/${month}/${day}`;
  }
  cancelOrder(){
    this.dialogRef.close();
  }
   reloadPage(): void {
    location.reload();
  }
  createOrder(id:any){
      const body = { state: 0,renterId:this.user?.id,itemIds:[id] };
     this.rentOrderService.create(body).subscribe(response => {
       console.log(response);
       this.showSuccess();
       setTimeout(() => {
         this.dialogRef.close();
       }, 4000)
       this.reloadPage();
     }, err => {
       console.error('Error:', err);
       this.showError()
       setTimeout(() => {
         this.dialogRef.close();
       }, 1000);
     });

  }
  showSuccess() {
    this.message.add({severity: 'success', summary: 'Success', detail: 'Operation completed successfully'});
  }
  showError() {
    this.message.add({severity: 'success', summary: 'Success', detail: 'Operation not completed tryAgain'});
  }
}
