import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRequestListMechanicComponent } from './service-request-list-mechanic.component';

describe('ServiceRequestListMechanicComponent', () => {
  let component: ServiceRequestListMechanicComponent;
  let fixture: ComponentFixture<ServiceRequestListMechanicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceRequestListMechanicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceRequestListMechanicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
