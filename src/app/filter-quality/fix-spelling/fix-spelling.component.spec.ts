import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixSpellingComponent } from './fix-spelling.component';

describe('FixSpellingComponent', () => {
  let component: FixSpellingComponent;
  let fixture: ComponentFixture<FixSpellingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixSpellingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixSpellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
