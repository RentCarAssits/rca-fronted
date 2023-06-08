import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedRentingOrderItemDialogComponent } from './selected-renting-order-item-dialog.component';

describe('SelectedRentingOrderItemDialogComponent', () => {
  let component: SelectedRentingOrderItemDialogComponent;
  let fixture: ComponentFixture<SelectedRentingOrderItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedRentingOrderItemDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedRentingOrderItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
