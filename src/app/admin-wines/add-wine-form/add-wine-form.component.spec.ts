import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWineFormComponent } from './add-wine-form.component';

describe('AddWineFormComponent', () => {
  let component: AddWineFormComponent;
  let fixture: ComponentFixture<AddWineFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWineFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
