import {
  Directive,
  Input,
  Renderer2,
  ElementRef,
  OnChanges,
} from '@angular/core';

@Directive({
  selector: '[modHighlight]',
})
export class HighlightDirective implements OnChanges {
  @Input() highlightClass?: string = 'highlight';
  @Input() highlightText: string | string[];
  @Input() text: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    if (
      !this.highlightText ||
      !this.highlightText.length ||
      !this.highlightClass
    ) {
      return this.renderer.setProperty(
        this.el.nativeElement,
        'innerHTML',
        this.sanitizeText(this.text)
      );
    }

    this.renderer.setProperty(
      this.el.nativeElement,
      'innerHTML',
      this.getFormattedText()
    );
  }

  getFormattedText() {
    // Sanitize incoming text to prevent RegExp DoS
    let searchText = Array.isArray(this.highlightText)
      ? this.highlightText
      : [this.highlightText];
    searchText = searchText.map(this.sanitizeText);

    const re = new RegExp(`(${searchText.join('|')})`, 'ig');

    return this.sanitizeText(this.text).replace(
      re,
      `<span class="${this.highlightClass}">$1</span>`
    );
  }

  sanitizeText(text) {
    return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}
