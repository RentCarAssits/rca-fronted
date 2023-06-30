import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServiceItemComponent } from './create-service-item.component';

describe('CreateServiceItemComponent', () => {
  let component: CreateServiceItemComponent;
  let fixture: ComponentFixture<CreateServiceItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateServiceItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateServiceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
