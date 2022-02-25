import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellarAllocationFormComponent } from './cellar-allocation-form.component';

describe('CellarAllocationFormComponent', () => {
  let component: CellarAllocationFormComponent;
  let fixture: ComponentFixture<CellarAllocationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellarAllocationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellarAllocationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
