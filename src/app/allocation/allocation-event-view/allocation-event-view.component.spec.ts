import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocationEventViewComponent } from './allocation-event-view.component';

describe('AllocationEventViewComponent', () => {
  let component: AllocationEventViewComponent;
  let fixture: ComponentFixture<AllocationEventViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllocationEventViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocationEventViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
