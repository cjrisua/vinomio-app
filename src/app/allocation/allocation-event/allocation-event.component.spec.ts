import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocationEventComponent } from './allocation-event.component';

describe('AllocationEventComponent', () => {
  let component: AllocationEventComponent;
  let fixture: ComponentFixture<AllocationEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllocationEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocationEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
