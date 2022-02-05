import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellarAddWineComponent } from './cellar-add-wine.component';

describe('CellarAddWineComponent', () => {
  let component: CellarAddWineComponent;
  let fixture: ComponentFixture<CellarAddWineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellarAddWineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellarAddWineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
