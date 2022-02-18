import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellarAllocationEventComponent } from './cellar-allocation-event.component';

describe('CellarAllocationEventComponent', () => {
  let component: CellarAllocationEventComponent;
  let fixture: ComponentFixture<CellarAllocationEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellarAllocationEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellarAllocationEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
