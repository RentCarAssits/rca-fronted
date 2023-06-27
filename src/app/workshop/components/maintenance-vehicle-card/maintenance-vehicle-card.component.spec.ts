import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceVehicleCardComponent } from './maintenance-vehicle-card.component';

describe('MaintenanceVehicleCardComponent', () => {
  let component: MaintenanceVehicleCardComponent;
  let fixture: ComponentFixture<MaintenanceVehicleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceVehicleCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintenanceVehicleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
