import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  clickCount = signal(0);

  private destroyRef = inject(DestroyRef);

  constructor(){
    // effect() taks a callback which angular will re-execute whenever any Signal used inside is updated.
    effect(() => {
      console.log(`Clicked button ${this.clickCount()} times.`)
    });
  }

  ngOnInit() : void {
  //   const subscription = interval(1000).pipe(
  //     map((val) => val * 2)
  //   ).subscribe({
  //     next: (val) => console.log(val),
  //   });

  //   this.destroyRef.onDestroy(() => {
  //     subscription.unsubscribe();
  //   });
  }  

  onClick() {
    this.clickCount.update(prevCount => prevCount + 1);
  }
}

/* 
* subscribing is necessary to start an interval. by default, calling interval does nothing unless there is at least one subscriber. 
*/
