import { Directive, Output, EventEmitter, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[removeWhiteSpace]'
})
export class RemoveWhiteSpaceDirective {

  @Output() ngModelChange = new EventEmitter();

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input') onChange() {
    const valueToProcess = this.el.nativeElement.value.replace(/\s/g, '');
    this.ngModelChange.emit(valueToProcess);
  }
}
