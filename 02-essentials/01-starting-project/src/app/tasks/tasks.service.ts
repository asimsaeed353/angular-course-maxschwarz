import { Injectable } from '@angular/core';

import { NewTaskData } from './task/task.model';

@Injectable({providedIn: 'root'})
export class TasksService {
    private dummyTasks = [
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
    ];

    // initialization - get the task from the localStorage
    constructor() {
      const tasks = localStorage.getItem('tasks');

      // in localStorage, you can store data in the form of JSON string so we need to conver this string into array 
      if(tasks) {
        this.dummyTasks = JSON.parse(tasks);
      }
    }

    // get all users task
    getUserTasks(userId: string) {
        return this.dummyTasks.filter((task) => task.userId === userId);
    }

    //insert a new task in the task array
    addTask(taskData: NewTaskData, userId: string) {
        this.dummyTasks.unshift({
        id: new Date().getTime().toString(),
        userId: userId, 
        title: taskData.title,
        summary: taskData.summary, 
        dueDate: taskData.dueDate,
        });
        this.saveTask(); // update the task in the local Storage
    }

    //remove a task
    removeTask(id: string){
        this.dummyTasks = this.dummyTasks.filter((task) => task.id != id);
        this.saveTask(); // update the task in the local Storage
    }

    private saveTask() {
      localStorage.setItem('tasks', JSON.stringify(this.dummyTasks));
    }
}