import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.css'],
})
export class WorkshopAComponent implements OnInit {
  // workshops!: any[]
  workshops = [
    { id: 1, name: 'hola', ownerId: 3, address: 'la marina' },
    { id: 2, name: 'hey', ownerId: 4, address: 'la marina' },
  ];
  ngOnInit(): void {}

  
}
