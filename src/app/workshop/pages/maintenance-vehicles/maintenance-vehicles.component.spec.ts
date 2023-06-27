import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceVehiclesComponent } from './maintenance-vehicles.component';

describe('MaintenanceVehiclesComponent', () => {
  let component: MaintenanceVehiclesComponent;
  let fixture: ComponentFixture<MaintenanceVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceVehiclesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintenanceVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
