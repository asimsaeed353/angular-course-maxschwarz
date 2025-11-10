import { Component, Input } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { NewTaskData } from './task/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  @Input({required: true}) userId!: string;  
  @Input({required: true}) name!: string;
  isAddingTask = false;

  get selectedUserTasks() {
    return 
  }

  // remove the task on click of complete task 
  onCompleteTask(id: string) {
      
  }
  // on clicking 'Add Task', show Add Task Modal
  onStartAddTask(){
    this.isAddingTask = true;
  }
  // on clicking 'Cancel', hide Add Task Modal
  onCancelAddTask(){
    this.isAddingTask = false;
  }

  // store new tasks in the dummyTasks[]
  onAddNewTask(taskData: NewTaskData) {
    
    // also close the add-task modal
    this.isAddingTask = false;
  }
  // to add in the beginning of the array, use 'unshift()'
}
