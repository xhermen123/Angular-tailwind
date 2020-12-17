import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageTasksComponent } from './language-tasks.component';

describe('LanguageTasksComponent', () => {
  let component: LanguageTasksComponent;
  let fixture: ComponentFixture<LanguageTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
