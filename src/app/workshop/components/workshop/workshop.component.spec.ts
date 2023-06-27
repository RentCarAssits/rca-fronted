import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopAComponent } from './workshop.component';

describe('WorkshopComponent', () => {
  let component: WorkshopAComponent;
  let fixture: ComponentFixture<WorkshopAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkshopAComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkshopAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
