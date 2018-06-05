import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhasesFormComponent } from './phases-form.component';

describe('PhasesFormComponent', () => {
  let component: PhasesFormComponent;
  let fixture: ComponentFixture<PhasesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhasesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhasesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
