import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentOrderRenterComponent } from './rent-order-renter.component';

describe('RentOrderRenterComponent', () => {
  let component: RentOrderRenterComponent;
  let fixture: ComponentFixture<RentOrderRenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentOrderRenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentOrderRenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
