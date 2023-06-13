import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentingOrderHistoryComponent } from './renting-order-history.component';

describe('RentingOrderHistoryComponent', () => {
  let component: RentingOrderHistoryComponent;
  let fixture: ComponentFixture<RentingOrderHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentingOrderHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentingOrderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
