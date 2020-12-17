import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, ViewChild, Component } from '@angular/core';

import { AppCheckboxComponent } from './app-checkbox.component';

@Component({
  template: '<app-checkbox [(ngModel)]="value" [type]="type" [small]="small" [checked]="checked"></app-checkbox>'
})
class TestHostComponent {
  @ViewChild(AppCheckboxComponent)
  public appCheckboxComponent: AppCheckboxComponent;

  public type = "accent";
  public small = true;
  public checked = false;
  public value = false;
}

describe('AppCheckboxComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestHostComponent, AppCheckboxComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component.appCheckboxComponent).toBeTruthy();
  });

  it('should create small checkbox', () => {
    component.small = true;
    component.value = true;
    fixture.detectChanges();
    expect(component.appCheckboxComponent).toBeTruthy();
  });

  it('should change checkbox value', () => {
    component.appCheckboxComponent.toggleCheckbox();
    fixture.detectChanges();
    expect(component.appCheckboxComponent._value).toEqual(true);
  });
  
  it('should call write value function', () => {
    component.appCheckboxComponent.writeValue(true);
    fixture.detectChanges();
    expect(component.appCheckboxComponent._value).toEqual(true);
  });
  
  it('should call register on change function', fakeAsync(() => {
    component.appCheckboxComponent.registerOnChange(() => {});
    fixture.detectChanges();
    tick();
    expect(component.appCheckboxComponent).toBeTruthy();
  }));
  
  it('should call register on touch function', fakeAsync(() => {
    component.appCheckboxComponent.registerOnTouched(() => {});
    fixture.detectChanges();
    tick();
    expect(component.appCheckboxComponent).toBeTruthy();
  }));
});
