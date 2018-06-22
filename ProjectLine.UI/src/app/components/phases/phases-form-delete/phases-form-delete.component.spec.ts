import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhasesFormDeleteComponent } from './phases-form-delete.component';

describe('PhasesFormDeleteComponent', () => {
  let component: PhasesFormDeleteComponent;
  let fixture: ComponentFixture<PhasesFormDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhasesFormDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhasesFormDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
