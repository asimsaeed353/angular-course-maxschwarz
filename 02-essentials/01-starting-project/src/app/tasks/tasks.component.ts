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

  dummyTasks = [
    {
      id: 't1',
      userId: 'u1',
      title: 'Master Angular',
      summary:
        'Learn all the basic and advanced features of Angular & how to apply them.',
      dueDate: '2025-12-31',
    },
    {
      id: 't2',
      userId: 'u3',
      title: 'Build first prototype',
      summary: 'Build a first prototype of the online shop website',
      dueDate: '2024-05-31',
    },
    {
      id: 't3',
      userId: 'u3',
      title: 'Prepare issue template',
      summary:
        'Prepare and describe an issue template which will help with project management',
      dueDate: '2024-06-15',
    },
  ]

  get selectedUserTasks() {
    return this.dummyTasks.filter((task) => task.userId === this.userId)
  }

  // remove the task on click of complete task 
  onCompleteTask(id: string) {
      this.dummyTasks = this.dummyTasks.filter((task) => task.id != id);
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
    this.dummyTasks.push({
      id: new Date().getTime().toString(),
      userId: this.userId, 
      title: taskData.title,
      summary: taskData.summary, 
      dueDate: taskData.dueDate,
    })
    // also close the add-task modal
    this.isAddingTask = false;
  }
  // to add in the beginning of the array, use 'unshift()'
}
