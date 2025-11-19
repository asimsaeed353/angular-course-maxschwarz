import { Component, signal, NgZone, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { InfoMessageComponent } from '../info-message/info-message.component';

@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
  imports: [InfoMessageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent implements OnInit {
  private zone = inject(NgZone);
  count = signal(0);

  get debugOutput() {
    console.log('[Counter] "debugOutput" binding re-evaluated.');
    return 'Counter Component Debug Output';
  }

  ngOnInit() {
    setTimeout(() => {
      this.count.set(0);
    }, 4000);

    // this setTimeout method does not change any value in the application so it should not be under angular's change detection radar. 
    // this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        console.log('Let\'s opt out of the zone change detection radar.')
      }, 5000);
    // });
    
  }

  onDecrement() {
    this.count.update((prevCount) => prevCount - 1);
  }

  onIncrement() {
    this.count.update((prevCount) => prevCount + 1);
  }
}
