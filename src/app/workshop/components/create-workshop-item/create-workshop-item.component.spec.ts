import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkshopItemComponent } from './create-workshop-item.component';

describe('CreateWorkshopItemComponent', () => {
  let component: CreateWorkshopItemComponent;
  let fixture: ComponentFixture<CreateWorkshopItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWorkshopItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateWorkshopItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
