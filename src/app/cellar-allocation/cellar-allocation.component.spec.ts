import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellarAllocationComponent } from './cellar-allocation.component';

describe('CellarAllocationComponent', () => {
  let component: CellarAllocationComponent;
  let fixture: ComponentFixture<CellarAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellarAllocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellarAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
