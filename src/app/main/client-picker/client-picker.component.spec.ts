import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPickerComponent } from './client-picker.component';

describe.skip('ClientPickerComponent', () => {
  let component: ClientPickerComponent;
  let fixture: ComponentFixture<ClientPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientPickerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
