import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModelSearcherComponent } from './admin-model-searcher.component';

describe('AdminModelSearcherComponent', () => {
  let component: AdminModelSearcherComponent;
  let fixture: ComponentFixture<AdminModelSearcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminModelSearcherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminModelSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
