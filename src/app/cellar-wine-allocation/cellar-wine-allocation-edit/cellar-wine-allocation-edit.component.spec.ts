import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellarWineAllocationEditComponent } from './cellar-wine-allocation-edit.component';

describe('CellarWineAllocationEditComponent', () => {
  let component: CellarWineAllocationEditComponent;
  let fixture: ComponentFixture<CellarWineAllocationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellarWineAllocationEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellarWineAllocationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
