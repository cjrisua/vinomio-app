import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProducersComponent } from './admin-producers.component';

describe('AdminProducersComponent', () => {
  let component: AdminProducersComponent;
  let fixture: ComponentFixture<AdminProducersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProducersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProducersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
