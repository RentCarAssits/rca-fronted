import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentingItemsAceptedComponent } from './renting-items-acepted.component';

describe('RentingItemsAceptedComponent', () => {
  let component: RentingItemsAceptedComponent;
  let fixture: ComponentFixture<RentingItemsAceptedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentingItemsAceptedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentingItemsAceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
