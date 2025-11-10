import { Component, Input } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { NewTaskData } from './task/task.model';
import { TasksService } from './tasks.service';

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

  // instantiate an instance of TasksService, this instance will be used to manipulate data in the TasksService 
  // why do we have to instantiate it like this cause if we instantiate different instances, each instance will have his own data and the modification will be made to the data of that instance and not the actual data. (same concept as copy by reference and copy by)
  constructor(private tasksService: TasksService){}

  get selectedUserTasks() {
    return this.tasksService.getUserTasks(this.userId);
  }
  
  // on clicking 'Add Task', show Add Task Modal
  onStartAddTask(){
    this.isAddingTask = true;
  }
  // on clicking 'Cancel', hide Add Task Modal
  onCloseAddTask(){
    this.isAddingTask = false;
  }
}
