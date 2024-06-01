import { Component, OnInit, Renderer2, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';

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
  title: string = '';
  date: string = '';
  timeLeft: string = '';
  private intId: any;

  @ViewChild('titleElement', { static: false }) titleElement?: ElementRef;
  @ViewChild('dateElement', { static: false }) dateElement?: ElementRef;

  constructor(private renderer: Renderer2) {}

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
    
    setTimeout(() => {
      this.adjustFontSize();
      this.title = (event.target as HTMLInputElement).value;
      this.saveToLocalStorage();

    }, 200);
      
  }

  adjustFontSize() {
    if (this.titleElement) {
      const element = this.titleElement.nativeElement;
      let fontSize = 10;
      element.style.fontSize = `${fontSize}vw`;
      while (element.scrollWidth > element.clientWidth && fontSize > 0) {
        fontSize -= 0.5;
        element.style.fontSize = `${fontSize}vw`;
      }
    }
  }

  adjustDateFontSize() {
    if (this.dateElement) {
      const element = this.dateElement.nativeElement;
      let fontSize = 10;
      element.style.fontSize = `${fontSize}vw`;
      while (element.scrollWidth > element.clientWidth && fontSize > 0) {
        fontSize -= 0.8;
        element.style.fontSize = `${fontSize}vw`;
      }
    }
  }

  onDateChange() {
    this.adjustDateFontSize();
    this.saveToLocalStorage();
    this.updateCountdown();
  }

  updateCountdown() {
    if (!this.date) {
      this.timeLeft = '';
      return;
    }

    const eventDate = new Date(this.date).getTime();
    const now = Date.now();
    const distance = eventDate - now;

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
