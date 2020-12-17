import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixSpellingItemComponent } from './fix-spelling-item.component';

describe('FixSpellingItemComponent', () => {
  let component: FixSpellingItemComponent;
  let fixture: ComponentFixture<FixSpellingItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FixSpellingItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixSpellingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
