import { Component, signal, inject, OnInit, DestroyRef } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);

  /* show fallback loading text */
  isLoading = signal(false);

  /* show error messages */
  error = signal('');

  private destroyRef = inject(DestroyRef);
  
  private placesService = inject(PlacesService);

  ngOnInit() {
    this.isLoading.set(true);
    const subscription = 
      this.placesService.loadAvailablePlaces().subscribe({
        next: (places) => {
          this.places.set(places);
        },
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

  onSelectPlace(selectedPlace: Place){
    const subscription = this.placesService.addPlaceToUserPlaces(selectedPlace.id).subscribe({
      // next: (resData) => console.log(resData),
    });

    this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
    });
  }
}
