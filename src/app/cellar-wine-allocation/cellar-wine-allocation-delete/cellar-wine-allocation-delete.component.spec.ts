import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellarWineAllocationDeleteComponent } from './cellar-wine-allocation-delete.component';

describe('CellarWineAllocationDeleteComponent', () => {
  let component: CellarWineAllocationDeleteComponent;
  let fixture: ComponentFixture<CellarWineAllocationDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellarWineAllocationDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellarWineAllocationDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
