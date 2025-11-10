import { Component, EventEmitter, inject, Output, Input } from '@angular/core';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {
  // properties to implement Two Way Binding - listen to the input or write data back to the input
  enteredTitle = '';
  enteredSummary = '';
  enteredDate = '';
  // why these all are string ? cause inputs in HTML always yield a string

  // input userId
  @Input({required: true}) userId!: string;

  // inject a dependency and initiate an instance with inject() and not the constructor approach
  private tasksService = inject(TasksService);

  @Output() close = new EventEmitter<void>();

  onCancel(){
    this.close.emit();
  }

  // prevent the default form submission (using FormsModule) and handle the logic here 
  onSubmit() {
    this.tasksService.addTask({
      title: this.enteredTitle,
      summary: this.enteredSummary, 
      dueDate: this.enteredDate
    }, 
    this.userId
    );
    this.close.emit();
  }
}
