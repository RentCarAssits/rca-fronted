import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRentingItemComponent } from './create-renting-item.component';

describe('CreateRentingItemComponent', () => {
  let component: CreateRentingItemComponent;
  let fixture: ComponentFixture<CreateRentingItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRentingItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRentingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
