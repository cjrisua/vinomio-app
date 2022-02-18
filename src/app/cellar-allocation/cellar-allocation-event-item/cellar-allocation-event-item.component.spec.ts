import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellarAllocationEventItemComponent } from './cellar-allocation-event-item.component';

describe('CellarAllocationEventItemComponent', () => {
  let component: CellarAllocationEventItemComponent;
  let fixture: ComponentFixture<CellarAllocationEventItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellarAllocationEventItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellarAllocationEventItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
