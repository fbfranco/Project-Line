import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageObjectiveComponent } from './message-objective.component';

describe('MessageObjectiveComponent', () => {
  let component: MessageObjectiveComponent;
  let fixture: ComponentFixture<MessageObjectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageObjectiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageObjectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
