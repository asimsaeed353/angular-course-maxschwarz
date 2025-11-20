import { Component, signal, inject, OnInit, DestroyRef } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { catchError, map, single, throwError } from 'rxjs';

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

  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  

  ngOnInit() {
    this.isLoading.set(true);
    const subscription = this.httpClient.get<{places: Place[]}>('http://localhost:3000/places')
      .pipe(
        map((resData) => resData.places), // converts an object contains arrays into an array
        catchError((error) => {
          console.log(error);
          return throwError(() => new Error("Something went wrong with fetching available place. Please try again later."))
        }),
      )
      .subscribe({
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
    this.httpClient.put('http://localhost:3000/user-places', {
      placeId: selectedPlace.id
    }).subscribe({
      // next: (resData) => console.log(resData),
    });
  }
}
