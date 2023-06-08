import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormCarComponent } from './edit-form-car.component';

describe('EditFormCarComponent', () => {
  let component: EditFormCarComponent;
  let fixture: ComponentFixture<EditFormCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFormCarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFormCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
