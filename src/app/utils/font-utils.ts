import { ElementRef } from '@angular/core';

export function adjustElementFontSize(element: ElementRef, initialFontSize: number = 10, decrementStep: number = 0.5): void {
  if (element) {
    const nativeElement = element.nativeElement;
    let fontSize = initialFontSize;
    nativeElement.style.fontSize = `${fontSize}vw`;
    while (nativeElement.scrollWidth > nativeElement.clientWidth && fontSize > 0) {
      fontSize -= decrementStep;
      nativeElement.style.fontSize = `${fontSize}vw`;
    }
  }
}
