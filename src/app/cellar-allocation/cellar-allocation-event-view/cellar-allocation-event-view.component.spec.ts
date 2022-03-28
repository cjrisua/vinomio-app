import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellarAllocationEventViewComponent } from './cellar-allocation-event-view.component';

describe('CellarAllocationEventViewComponent', () => {
  let component: CellarAllocationEventViewComponent;
  let fixture: ComponentFixture<CellarAllocationEventViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellarAllocationEventViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellarAllocationEventViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
