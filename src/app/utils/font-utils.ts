import { ElementRef } from '@angular/core';

export function adjustElementFontSize(element: ElementRef, initialFontSize: number = 10, decrementStep: number = 0.5): void {
  if (element) {
    const nativeElement = element.nativeElement; // Get the native element from the ElementRef object
    let fontSize = initialFontSize;
    nativeElement.style.fontSize = `${fontSize}vw`; // Set initial font size
    // Keep decreasing font size until the element is not wider than its container
    while (nativeElement.scrollWidth > nativeElement.clientWidth && fontSize > 0) {
      fontSize -= decrementStep;
      nativeElement.style.fontSize = `${fontSize}vw`;
    }
  }
}
