import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceItemOrderListComponent } from './service-item-order-list.component';

describe('ServiceItemOrderListComponent', () => {
  let component: ServiceItemOrderListComponent;
  let fixture: ComponentFixture<ServiceItemOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceItemOrderListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceItemOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
