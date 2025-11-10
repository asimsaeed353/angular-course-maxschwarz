import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { type NewTaskData } from '../task/task.model';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {
  // properties to implement Two Way Binding - listen to the input or write data back to the input
  enteredTitle = '';
  enteredSummary = '';
  enteredDate = '';
  // why these all are string ? cause inputs in HTML always yield a string

  // event to emit <form> data which will be stored in dummyTasks[]
  @Output() add = new EventEmitter<NewTaskData>();


  @Output() cancel = new EventEmitter<void>();

  onCancel(){
    this.cancel.emit();
  }

  // prevent the default form submission (using FormsModule) and handle the logic here 
  onSubmit() {
    this.add.emit({
      title: this.enteredTitle,
      summary: this.enteredSummary, 
      dueDate: this.enteredDate
    });
  }
}
