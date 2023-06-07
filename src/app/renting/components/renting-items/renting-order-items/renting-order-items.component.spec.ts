import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentingOrderItemsComponent } from './renting-order-items.component';

describe('RentingOrderItemsComponent', () => {
  let component: RentingOrderItemsComponent;
  let fixture: ComponentFixture<RentingOrderItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentingOrderItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentingOrderItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
