import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';

import { HighlightDirective } from './highlight.directive';

@Component({
  template: `<p
    appHighlight
    [highlightText]="'word'"
    [text]="'Highlight a word'"
  ></p>`,
})
class TestDefaultComponent {}

@Component({
  template: `<p
    appHighlight
    [highlightClass]="'custom-highlight'"
    [highlightText]="'word'"
    [text]="'Highlight a word'"
  ></p>`,
})
class TestCustomHighlightComponent {}

@Component({
  template: `<p
    appHighlight
    [highlightText]="['Highlight', 'word']"
    [text]="'Highlight a word'"
  ></p>`,
})
class TestMultipleWordsComponent {}

fdescribe('HighlightDirective', () => {
  let component: TestDefaultComponent;
  let fixture: ComponentFixture<TestDefaultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestDefaultComponent,
        TestCustomHighlightComponent,
        TestMultipleWordsComponent,
        HighlightDirective,
      ],
    });
  });

  it('should create the component', () => {
    fixture = TestBed.createComponent(TestCustomHighlightComponent);
    component = fixture.componentInstance;
    expect(component).toBeDefined();
  });

  it('should highlight a word', (done) => {
    fixture = TestBed.createComponent(TestDefaultComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;

    const debugEl: HTMLElement = fixture.debugElement.nativeElement;
    const p: HTMLElement = debugEl.querySelector('p');

    fixture.whenStable().then(() => {
      expect(p).toBeDefined();
      expect(debugEl.innerHTML).toContain(
        '<span class="highlight">word</span>'
      );
      done();
    });
  });

  it('should highlight a word with custom class', (done) => {
    fixture = TestBed.createComponent(TestCustomHighlightComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;

    const debugEl: HTMLElement = fixture.debugElement.nativeElement;
    const p: HTMLElement = debugEl.querySelector('p');

    fixture.whenStable().then(() => {
      expect(p).toBeDefined();
      expect(debugEl.innerHTML).toContain(
        '<span class="custom-highlight">word</span>'
      );
      done();
    });
  });

  it('should highlight multiple words', (done) => {
    fixture = TestBed.createComponent(TestMultipleWordsComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;

    const debugEl: HTMLElement = fixture.debugElement.nativeElement;
    const p: HTMLElement = debugEl.querySelector('p');

    fixture.whenStable().then(() => {
      expect(p).toBeDefined();
      expect(debugEl.innerHTML).toContain(
        '<span class="highlight">Highlight</span>'
      );
      expect(debugEl.innerHTML).toContain(
        '<span class="highlight">word</span>'
      );
      done();
    });
  });
});
