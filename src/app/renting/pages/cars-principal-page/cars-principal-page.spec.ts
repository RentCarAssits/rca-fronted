import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsPrincipalPage } from './cars-principal-page';

describe('CarRentalListComponent', () => {
  let component: CarsPrincipalPage;
  let fixture: ComponentFixture<CarsPrincipalPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarsPrincipalPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarsPrincipalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
