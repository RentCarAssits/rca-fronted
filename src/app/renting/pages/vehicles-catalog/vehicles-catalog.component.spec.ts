import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesCatalogComponent } from './vehicles-catalog.component';

describe('VehiclesCatalogComponent', () => {
  let component: VehiclesCatalogComponent;
  let fixture: ComponentFixture<VehiclesCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclesCatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiclesCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
