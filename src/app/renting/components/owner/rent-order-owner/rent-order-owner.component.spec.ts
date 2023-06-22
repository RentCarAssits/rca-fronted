import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentOrderOwnerComponent } from './rent-order-owner.component';

describe('RentOrderOwnerComponent', () => {
  let component: RentOrderOwnerComponent;
  let fixture: ComponentFixture<RentOrderOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentOrderOwnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentOrderOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
