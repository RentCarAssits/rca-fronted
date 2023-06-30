import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticListMechanicComponent } from './diagnostic-list-mechanic.component';

describe('DiagnosticListMechanicComponent', () => {
  let component: DiagnosticListMechanicComponent;
  let fixture: ComponentFixture<DiagnosticListMechanicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticListMechanicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagnosticListMechanicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
