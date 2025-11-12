import { Component, input, Input, signal,output } from '@angular/core';
import { Ticket } from '../ticket.model';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {

  /* take a single ticket as input */
  // @Input({required: true}) ticket?: Ticket;
  /* alternatively */
  ticket = input.required<Ticket>();

  // enable/disable show details
  detailsVisible = signal(false);

  // emit complete/close ticket output
  closeTicket = output();

  onToggleDetails() {
    // this.detailsVisible.set(!this.detailsVisible);
    /* alternatively */
    this.detailsVisible.update((wasVisible) => !wasVisible);
    // update() is different from set() as it takes a function, takes the old value and return the new value.
  }

  onCompleteTicket() {
    this.closeTicket.emit();
  }
}
