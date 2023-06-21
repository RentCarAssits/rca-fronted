import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedRentingItemsComponent } from './accepted-renting-items.component';

describe('AcceptedRentingItemsComponent', () => {
  let component: AcceptedRentingItemsComponent;
  let fixture: ComponentFixture<AcceptedRentingItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptedRentingItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptedRentingItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
