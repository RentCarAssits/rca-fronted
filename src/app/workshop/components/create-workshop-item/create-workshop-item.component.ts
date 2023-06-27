import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-workshop-item',
  templateUrl: './create-workshop-item.component.html',
  styleUrls: ['./create-workshop-item.component.css']
})
export class CreateWorkshopItemComponent {
  workshopForm!: FormGroup;




  onSubmit(){}
}
