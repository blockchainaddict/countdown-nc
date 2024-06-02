import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { adjustElementFontSize } from '../utils/font-utils';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate('1s ease-in')])
    ]),
  ]
})
export class CountdownComponent implements OnInit, AfterViewInit, OnDestroy {
  title: string = ''; // Title of the event
  date: string = ''; // Date of the event
  timeLeft: string = ''; // Time left until the event
  private intId: any; // Interval ID

  // Element references: will be used to refer to the elements that need font-size adjusting
  @ViewChild('titleElement', { static: false }) titleElement?: ElementRef; // 'titleElement' is a reference to the element with the id 'titleElement'
  @ViewChild('dateElement', { static: false }) dateElement?: ElementRef; // 'dateElement' is a reference to the element with the id 'dateElement'

  constructor() { }

  ngOnInit() {
    this.loadFromLocalStorage();
    this.updateCountdown();
    this.adjustDateFontSize();
    this.intId = setInterval(() => this.updateCountdown(), 1000);
  }

  ngAfterViewInit() {
    this.adjustFontSize();
    this.adjustDateFontSize();
  }

  ngOnDestroy() {
    if (this.intId) {
      clearInterval(this.intId);
    }
  }

  loadFromLocalStorage() {
    this.title = localStorage.getItem('eventTitle') || '';
    this.date = localStorage.getItem('eventDate') || '';
    this.adjustFontSize();
  }

  saveToLocalStorage() {
    localStorage.setItem('eventTitle', this.title);
    localStorage.setItem('eventDate', this.date);
  }

  updateTitle(event: Event) {
    this.title = (event.target as HTMLInputElement).value;
    this.saveToLocalStorage();

    setTimeout(() => {
      this.adjustFontSize();
    }, 300)
  }

  adjustFontSize() {
    if (this.titleElement) {
      adjustElementFontSize(this.titleElement, 10, 0.5);
    }
  }

  adjustDateFontSize() {
    if (this.dateElement) {
      adjustElementFontSize(this.dateElement, 10, 0.5);
    }
  }

  onDateChange() {
    this.adjustDateFontSize();
    this.saveToLocalStorage();
    this.updateCountdown();
  }

  // Countdown logic
  updateCountdown() {
    // Make sure the date is set
    if (!this.date) {
      this.timeLeft = '';
      return;
    }

    // Get the 'distance' between now and the count down date
    const eventDate = new Date(this.date).getTime();
    const now = Date.now();
    const distance = eventDate - now;

    if (distance < 0) {
      this.timeLeft = 'The event has passed';
      return;
    }

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    this.timeLeft = `${days} days, ${hours} h, ${minutes}m, ${seconds}s`;
  }
}
