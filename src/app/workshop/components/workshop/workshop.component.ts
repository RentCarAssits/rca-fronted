import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateRentingItemComponent } from 'src/app/renting/components/renting-items/create-renting-item/create-renting-item.component';
import { CreateWorkshopItemComponent } from '../create-workshop-item/create-workshop-item.component';
import { WorkshopService } from '../../services/workshop-s/workshop.service';
import { AuthService } from 'src/app/iam/services/auth.service';

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.css'],
})
export class WorkshopAComponent implements OnInit {
   workshops!: any[]
  user = this.authService.getCurrentUser();
  // workshops = [
  //   { id: 1, name: 'hola', ownerId: 3, address: 'la marina' },
  //   { id: 2, name: 'hey', ownerId: 4, address: 'la marina' },
  // ];
  // workshops = [];
  ref!: DynamicDialogRef;
  workshopItemForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private dialogService: DialogService,
    private service: WorkshopService
  ) {}
  ngOnInit(): void {
    //TODO: Descomentar
    this.getAllWorkshops();
  }

  getAllWorkshops(){
    //make it dynamic 
    this.service.getAllWorkshops(this.user?.id).subscribe((response: any) => {
      console.log(this.workshops);
      this.workshops = response.result;
    }, (error) => {
      console.error(error);
    })
  }


  createWorkshop() {
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

    this.dialogService.open(CreateWorkshopItemComponent, {
      header: 'Create WorkShop',
      width: width,
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
  }
}
