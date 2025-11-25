import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TasksService } from '../tasks.service';
import { CanDeactivateFn, Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  userId = input.required<string>();
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');
  private tasksService = inject(TasksService);
  private router = inject(Router);

  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userId()
    );

    this.router.navigate(['/users', this.userId(), 'tasks'], {
      replaceUrl: true, // make sure the user can not come back to old form submission by cilcking back button in browser
    })
  }
}

export const canLeaveEditPage: CanDeactivateFn<NewTaskComponent> = (component) => {
    if (component.enteredTitle() || component.enteredDate() || component.enteredSummary()){
      return window.confirm('Do you really want to leave the page? You will lose your data');
    }

    return true
};
