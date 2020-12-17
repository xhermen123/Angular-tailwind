import {FormsModule} from '@angular/forms';
import {DatePickerComponent} from './date-picker.component';
import {DayTimeCalendarComponent} from '../day-time-calendar/day-time-calendar.component';
import {DayTimeCalendarService} from '../day-time-calendar/day-time-calendar.service';
import {DomHelper} from '../common/services/dom-appender/dom-appender.service';
import {CalendarMode} from '../common/types/calendar-mode';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DayCalendarComponent} from '../day-calendar/day-calendar.component';
import {TimeSelectComponent} from '../time-select/time-select.component';
import {CalendarNavComponent} from '../calendar-nav/calendar-nav.component';
import {MonthCalendarComponent} from '../month-calendar/month-calendar.component';
import {DayCalendarService} from '../day-calendar/day-calendar.service';
import {TimeSelectService} from '../time-select/time-select.service';
import {UtilsService} from '../common/services/utils/utils.service';
import {By} from '@angular/platform-browser';
import moment from 'moment';
import { IDate } from '../common/models/date.model';
import { SelectEvent } from '../common/types/selection-event.enum';

describe('Component: DatePickerComponent', () => {
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;

  const setComponentMode = (mode: CalendarMode) => {
    component.mode = mode;
    component.init();
    fixture.detectChanges();
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        DatePickerComponent,
        DayTimeCalendarComponent,
        DayCalendarComponent,
        TimeSelectComponent,
        CalendarNavComponent,
        MonthCalendarComponent
      ],
      providers: [
        DayTimeCalendarService,
        DayCalendarService,
        TimeSelectService,
        UtilsService,
        DomHelper
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event goToCurrent when day calendar emit', () => {
    setComponentMode('day');

    spyOn(component.onGoToCurrent, 'emit');
    component.dayCalendarRef.onGoToCurrent.emit();
    expect(component.onGoToCurrent.emit).toHaveBeenCalledWith();
  });

  it('should emit event goToCurrent when month calendar emit', () => {
    setComponentMode('month');

    spyOn(component.onGoToCurrent, 'emit');
    component.monthCalendarRef.onGoToCurrent.emit();
    expect(component.onGoToCurrent.emit).toHaveBeenCalledWith();
  });

  it('should emit event goToCurrent when daytime calendar emit', () => {
    setComponentMode('daytime');

    spyOn(component.onGoToCurrent, 'emit');
    component.dayTimeCalendarRef.onGoToCurrent.emit();
    expect(component.onGoToCurrent.emit).toHaveBeenCalledWith();
  });

  it('should call onTouched when input is blurred', () => {
    setComponentMode('day');
    spyOn(component, 'onTouchedCallback');
    component.registerOnTouched(component.onTouchedCallback);

    const inputElement = fixture.debugElement.query(By.css('.app-picker-input'));
    inputElement.triggerEventHandler('blur', {});

    expect(component.onTouchedCallback).toHaveBeenCalledWith();
  });

  it('should get openOnFocus property', () => {
    expect(component.openOnFocus).toEqual(true);
  });

  it('should set openOnClick property', () => {
    expect(component.openOnClick).toEqual(true);
  });

  it('should test set areCalendarsShown as true', () => {
    component.areCalendarsShown = true;

    expect(component._areCalendarsShown).toEqual(true);
  });

  it('should test set areCalendarsShown as false', () => {
    component.areCalendarsShown = false;

    expect(component._areCalendarsShown).toEqual(false);
  });
  
  it('should test set selected as false', () => {
    component.selected = [moment("1-1-2009", "DD-MM-YYYY")];

    expect(component.selected).toEqual([moment("1-1-2009", "DD-MM-YYYY")]);
  });

  it('should test onBodyClick function', () => {
    component.componentConfig = {
      hideOnOutsideClick: true,
    };
    component.onBodyClick();
    fixture.detectChanges();

    expect(component.hideStateHelper).toEqual(false);
  });
   
  it('should test onBodyClick function handle calender', () => {
    component.componentConfig = {
      hideOnOutsideClick: true,
    };
    component.areCalendarsShown = true;

    component.onBodyClick();
    fixture.detectChanges();

    expect(component.hideStateHelper).toEqual(false);
  });
   
  it('should test onClick event', () => {
    component.componentConfig = {
      openOnClick: true,
    };

    fixture.debugElement.triggerEventHandler('click', {});
    
    expect(component.hideStateHelper).toEqual(true);
  });
 
  it('should test onClick event when openOnClick false', () => {
    component.componentConfig = {
      openOnClick: false,
    };

    const res = fixture.debugElement.triggerEventHandler('click', {});
    
    expect(res).toEqual(undefined);
  });

  it('should test setDisabledState function', () => {
    component.setDisabledState(true);
    
    expect(component.disabled).toEqual(true);
  });

  it('should test inputFocused function', () => {
    component.componentConfig = {
      openOnFocus: true,
    };
    component.inputFocused();
    fixture.detectChanges();
    expect(component.isFocusedTrigger).toEqual(true);
  });

  
  it('should test inputFocused function return null', () => {
    component.componentConfig = {
      openOnClick: false,
    };
    let res = component.inputFocused();

    expect(res).toEqual(undefined);
  });

  it('should test onViewDateChange function', () => {
    component.onViewDateChange(moment("1-1-2009", "DD-MM-YYYY"));

    expect(component.selected).toBeDefined();
  });

  it('should test dateSelected function', () => {
    const date: IDate = {
      date: moment(),
      selected: false
    };
    const type: SelectEvent = SelectEvent.INPUT;

    component.dateSelected(date, "year", type, false);
    expect(component.selected).toBeDefined();
  });
});
