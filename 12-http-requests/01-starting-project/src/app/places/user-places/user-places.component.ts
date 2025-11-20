import { Component, signal, inject, OnInit, DestroyRef } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
  /* show fallback loading text */
  isLoading = signal(false);

  /* show error messages */
  error = signal('');

  private placesService = inject(PlacesService  );
  private destroyRef = inject(DestroyRef);
  
  places = this.placesService.loadedUserPlaces;

  ngOnInit() {
    this.isLoading.set(true);
    const subscription = 
      this.placesService.loadUserPlaces().subscribe({
        error: (err: Error) => {
          this.error.set(err.message);
        },
        complete: () => {
          this.isLoading.set(false);
        }
      });

    this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
    });
  }
}
