import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { A11yFlyoutComponent } from './a11y-flyout.component';

describe.skip('A11yPickerComponent', () => {
  let component: A11yFlyoutComponent;
  let fixture: ComponentFixture<A11yFlyoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [A11yFlyoutComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(A11yFlyoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
