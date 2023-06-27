import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRentingOrderDialogComponent } from './create-renting-order-dialog.component';

describe('CreateRentingOrderDialogComponent', () => {
  let component: CreateRentingOrderDialogComponent;
  let fixture: ComponentFixture<CreateRentingOrderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRentingOrderDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRentingOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
