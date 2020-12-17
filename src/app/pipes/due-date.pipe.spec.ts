import { DueDatePipe } from './due-date.pipe';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import moment from 'moment';

@Component({
  template: '<span>{{seconds | dueDate}}</span>'
})
class TestHostComponent {
  public seconds: any;
}

describe('DueDatePipe', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestHostComponent, DueDatePipe ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('create an instance', () => {
    const pipe = new DueDatePipe();
    expect(pipe).toBeTruthy();
  });

  it('should test invalid input', () => {
    component.seconds = 'invalid'
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('span').textContent).toContain('Invalid');
  });

  it('should over a year diff check', () => {
    component.seconds = moment("1-1-2009", "DD-MM-YYYY").valueOf();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('span').textContent).toContain('Jan 01, 2009');
  });

  it('should a week due date', fakeAsync(() => {
    component.seconds = moment().add(1, 'week').add(2, 'day').valueOf();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    tick();
    tick();
    expect(compiled.querySelector('span').textContent).toContain('1 Week');
  }));

  it('should a week ago due date', fakeAsync(() => {
    component.seconds = moment().add(-1, 'week').add(-2, 'day').valueOf();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    tick();
    tick();
    expect(compiled.querySelector('span').textContent).toContain('1 Week Ago');
  }));
  
  it('should 3 weeks ago due date', () => {
    component.seconds =  moment().add(-3, 'week').add(-2, 'day').valueOf();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('span').textContent).toContain('3 Weeks Ago');
  });
  
  it('should 3 weeks due date', () => {
    component.seconds =  moment().add(3, 'week').add(2, 'day').valueOf();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('span').textContent).toContain('3 Weeks');
  });

  it('should a month ago due date', () => {
    component.seconds = moment().add(-1, 'month').add(-2, 'day').valueOf();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('span').textContent).toContain('1 Month Ago');
  });
  
  it('should a month due date', () => {
    component.seconds =  moment().add(1, 'month').add(2, 'day').valueOf();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('span').textContent).toContain('1 Month');
  });

  it('should 5 months ago due date', () => {
    component.seconds =  moment().add(-5, 'month').add(-5, 'day').valueOf();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('span').textContent).toContain('5 Months Ago');
  });
  
  it('should 5 months due date', () => {
    component.seconds =  moment().add(5, 'month').add(5, 'day').valueOf();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('span').textContent).toContain('5 Months');
  });

  it('should 5 days ago due date', () => {
    component.seconds = moment().add(-5, 'day').add(-2, 'hour').valueOf();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    console.log('-------------', compiled.querySelector('span').textContent);
    expect(compiled.querySelector('span').textContent).toContain('5 Days Ago');
  });
  
  it('should 5 days due date', () => {
    component.seconds = moment().add(5, 'day').add(2, 'hour').valueOf();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('span').textContent).toContain('5 Days');
  });
  
  it('should a day ago due date', () => {
    component.seconds = moment().add(-1, 'day').add(-2, 'hour').valueOf();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('span').textContent).toContain('1 Day Ago');
  });
  
  it('should a day due date', () => {
    component.seconds = moment().add(1, 'day').add(2, 'hour').valueOf();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('span').textContent).toContain('1 Day');
  });
});
