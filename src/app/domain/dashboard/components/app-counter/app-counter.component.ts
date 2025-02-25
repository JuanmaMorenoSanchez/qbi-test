import { Component, Input, OnInit } from '@angular/core';
import { signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './app-counter.component.html',
  styleUrls: ['./app-counter.component.css']
})
export class AppCounterComponent implements OnInit {
  @Input() count: number = 0; // This will be the value passed from the parent component
  currentCount = signal(0);   // Internal signal to store the current count value
  duration = 2; // Animation duration in seconds

  ngOnInit() {
    this.animateCount();
  }

  private animateCount() {
    const step = this.count / (this.duration * 60);
    let counter = 0;

    const interval = setInterval(() => {
      counter += step;
      this.currentCount.set(Math.min(Math.floor(counter), this.count));
      if (counter >= this.count) {
        clearInterval(interval);
      }
    }, 1000 / 60);
  }
}
