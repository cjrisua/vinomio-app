import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreAreaTextboxComponent } from './core-area-textbox.component';

describe('CoreAreaTextboxComponent', () => {
  let component: CoreAreaTextboxComponent;
  let fixture: ComponentFixture<CoreAreaTextboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreAreaTextboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreAreaTextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
