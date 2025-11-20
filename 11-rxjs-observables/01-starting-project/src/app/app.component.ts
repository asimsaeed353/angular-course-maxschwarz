import { afterNextRender, Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  // conversion: Signal() -> Observable
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);

  // conversion: Observable -> Signal()
  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, {initialValue: 0}); 
  /* 
  * intervalSignal has now become Singal() and you can apply functions like computed and effect on it
  * while converting from observable to the signal() pass the 'initia value' of the signal as second paramter to 'toSignal()' function 
  * with toSignal(), you do not need to cean up the subscription as it will do automatically 
  */ 

  /* Custom Observable from Scratch */
  customInterval$ = new Observable((subscriber) => {
    let timesExecuted = 0;
    
    const interval = setInterval(() => {
      // subscriber.error(); // observable can throw an error 
      if(timesExecuted >= 3){
        clearInterval(interval);
        subscriber.complete(); // clean up the subscription
        return;
      }
      console.log('Emitting new values.....');
      subscriber.next({message: 'Click Times'});
      timesExecuted++;
    }, 2000);
  });
  

  private destroyRef = inject(DestroyRef);

  // constructor(){
    // effect() taks a callback which angular will re-execute whenever any Signal used inside is updated.
  //   effect(() => {
  // //     console.log(`Clicked button ${this.clickCount()} times.`)
  // //   });
  // }

  ngOnInit() : void {
  //   const subscription = interval(1000).pipe(
  //     map((val) => val * 2)
  //   ).subscribe({
  //     next: (val) => console.log(val),
  //   });

  //   this.destroyRef.onDestroy(() => {
  //     subscription.unsubscribe();
  //   });

  this.customInterval$.subscribe({
    next: (val) => console.log(val),
    complete: () => console.log("COMPLETED"),  // listened to the completed event 
    error: (err) => console.log(err), // log an error value 
  });

    const subscription  = this.clickCount$.subscribe({
      next: (val) => console.log(`Clickes buton ${this.clickCount()}`),
    });

     this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }  
  

  onClick() {
    this.clickCount.update(prevCount => prevCount + 1);
  }
}

/* 
* subscribing is necessary to start an interval. by default, calling interval does nothing unless there is at least one subscriber. 
*/
