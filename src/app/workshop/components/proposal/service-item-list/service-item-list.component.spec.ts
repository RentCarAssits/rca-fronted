import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceItemListComponent } from './service-item-list.component';

describe('ServiceItemListComponent', () => {
  let component: ServiceItemListComponent;
  let fixture: ComponentFixture<ServiceItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceItemListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
