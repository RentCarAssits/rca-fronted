import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestItemListComponent } from './request-item-list.component';

describe('RequestItemListComponent', () => {
  let component: RequestItemListComponent;
  let fixture: ComponentFixture<RequestItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestItemListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
