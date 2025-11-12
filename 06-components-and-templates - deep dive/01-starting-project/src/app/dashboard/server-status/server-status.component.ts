import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent implements OnInit {
  // currentStatus: 'online' | 'offline' | 'unknown' = 'online';
  /* Signal Alternate to this */
  currentStatus = signal<'online' | 'offline' | 'unknown'>('offline');

  // compnent cleanup using DestroyRef
  private destroyRef = inject(DestroyRef);
  // now we can listen to component destroy event and execute any function we want to execute when component is about to be destroyed.

  constructor() {
    effect(() => {
        console.log(this.currentStatus());
    });
  }
  // keep your constructor clean and use for initializing values 

  // for complex tasks, use 
  ngOnInit() {
    console.log('ON INIT');
    const interval = setInterval(() => {
      const rnd = Math.random(); // 0 - 0.9999999
      
      if(rnd < 0.5){
        this.currentStatus.set('online');
      } else if (rnd < 0.9) {
        this.currentStatus.set('offline');
      } else {
        this.currentStatus.set('unknown');
      }
    }, 5000);

    // add a listner here, to execute some code when the comonent is about to be destroyed. similary we can add such listener at some other place in our class. 
    this.destroyRef.onDestroy(() => {
      clearInterval(interval);
    });
  }

  ngAfterViewInit(){
    console.log("AFTER VIEW INIT");
  }
}
