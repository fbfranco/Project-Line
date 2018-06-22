import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectiveAddComponent } from './objective-add.component';

describe('ObjectiveAddComponent', () => {
  let component: ObjectiveAddComponent;
  let fixture: ComponentFixture<ObjectiveAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectiveAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectiveAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
