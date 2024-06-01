import { Component, OnInit, Renderer2, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-countdown-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('void', style({
        opacity: 0
      })),
      transition(':enter', [
        animate('1s ease-in')
      ])
    ])
  ]
})

export class CountdownComponent implements OnInit, AfterViewInit {
  // Initialize variables for user interaction
  title: string = '';
  date: string = '';
  timeLeft: string = '';

  // Reference to the title element
  @ViewChild('titleElement', { static: false }) titleElement?: ElementRef;
  @ViewChild('dateElement', { static: false }) dateElement?: ElementRef;

  constructor(private renderer: Renderer2) {
  }

  ngOnInit() {
    this.updateCountdown();
    // Update countdown every second
    setInterval(() => {
      this.updateCountdown()
      this.adjustDateFontSize();

    }, 1000);
  }

  ngAfterViewInit() {
    // this.adjustFontSize();
    this.adjustDateFontSize();
  }

  // Update title and adjust font size everytime input is changed
  updateTitle(event: any): void {
    this.title = event.target.value;
    this.adjustFontSize();
  }

  adjustFontSize() {
    // Check if title element exists
    if (this.titleElement) {
      const element = this.titleElement.nativeElement;
      let fontSize = 10; // Make sure its = to the font defined in the .scss to avoid 'jumpy' behaviour
      element.style.fontSize = fontSize + 'vw';
      while (element.scrollWidth > element.clientWidth && fontSize > 0) {
        fontSize -= 1; // Decrease font size until it fits
        element.style.fontSize = fontSize + 'vw';
      }
    }
  }

  adjustDateFontSize() {
    // Check if title element exists
    if (this.dateElement) {
      const element = this.dateElement.nativeElement;
      let fontSize = 10; // Make sure its = to the font defined in the .scss to avoid 'jumpy' behaviour
      element.style.fontSize = fontSize + 'vw';
      while (element.scrollWidth > element.clientWidth && fontSize > 0) {
        fontSize -= 1; // Decrease font size until it fits
        element.style.fontSize = (fontSize - 0.8) + 'vw';
      }
    }
  }

  onDateChange(event: any) {
    this.adjustDateFontSize();
    console.log('Input date changed:', this.date);
    this.updateCountdown();
  }

  updateCountdown() {
    if (!this.date) {
      this.timeLeft = '';
      return;
    }

    // this.adjustDateFontSize();

    // Calculate time left until event
    const eventDate = new Date(this.date).getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;

    // Check if event has passed
    if (distance < 0) {
      this.timeLeft = 'The event has passed';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    this.timeLeft = `${days} days, ${hours} h, ${minutes}m, ${seconds}s`;
  }
}
