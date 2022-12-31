import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocationEventItemComponent } from './allocation-event-item.component';

describe('AllocationEventItemComponent', () => {
  let component: AllocationEventItemComponent;
  let fixture: ComponentFixture<AllocationEventItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllocationEventItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocationEventItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
