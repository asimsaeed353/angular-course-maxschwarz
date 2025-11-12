import { Component } from '@angular/core';
import { NewTicketComponent } from "./new-ticket/new-ticket.component";

import { Ticket } from './ticket.model';
import { TicketComponent } from "./ticket/ticket.component";

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [NewTicketComponent, TicketComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent {
  tickets: Ticket[] = [];
  /* newticketcomponent will recieve the tickets input data, we the output that data and accept the data in the above variable */
  /* we could use Service but we need to do it using the Components */

  onAdd(ticketData: {title: string; text: string}){
    // save ticket in a variable and then push this ticket into the array
    const ticket: Ticket = {
      title: ticketData.title,
      request: ticketData.text,
      id: Math.random().toString(),
      status: 'open',
    }

    this.tickets.push(ticket);
  }

  /* ----- mark a ticket as closed ------ */
  onCloseTicket(id: string) {
    this.tickets = this.tickets.map((ticket) => {
      if (ticket.id === id){
        return { ...ticket, status: 'closed' }
      }
      return ticket;
    })
  } 
  // to trigger this method, we need to emit an event on the `ticket` component 
}
