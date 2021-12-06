import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProducersFormComponent } from './admin-producers-form.component';

describe('AdminProducersFormComponent', () => {
  let component: AdminProducersFormComponent;
  let fixture: ComponentFixture<AdminProducersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProducersFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProducersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
