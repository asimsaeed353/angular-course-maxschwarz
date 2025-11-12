import { Component, ElementRef, EventEmitter, viewChild, ViewChild, ViewChildren, Output, output } from '@angular/core';

import { ControlComponent } from '../../../shared/control/control.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ControlComponent, ButtonComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent {

  /* in the paranthesis, you need to pass the name of the template variable assigned in the template file. */
  @ViewChild('form') private form?: ElementRef<HTMLFormElement>;
  
  /* property to output form values */
  // @Output() add = new EventEmitter<{title: string; text: string}>();
  add = output<{title: string; text: string}>();

   // capute the form input value(s) using Template Variables
  onSubmit(titleElement: string, textElement: string) {
    this.add.emit({title: titleElement, text: textElement});
    this.form?.nativeElement.reset();
  }
}
