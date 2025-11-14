import { Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';

@Injectable({
    providedIn: 'root', // makes it accessible from anywhere in the app
})
export class TasksService {

    /* mark the tasks private so it is writeable only in this service class and makes only read-only signals in the components where the service will be injected */
    private tasks = signal<Task[]>([]);
    allTasks = this.tasks.asReadonly(); // yield only read-only signals 

    addTask(taskData: {title: string, description: string}){
        const newTask: Task = {
            ...taskData, 
            id: Math.random().toString(),
            status: 'OPEN'
        }

        this.tasks.update((oldTasks) => [...oldTasks, newTask]);
    }

    updateTaskStatus(taskId: string, newStatus: TaskStatus) {
        this.tasks.update((oldTasks) => oldTasks.map((task) => task.id === taskId ? {...task, status: newStatus} : task));

        /* .map() takes a function, loops through each element of the array and returns a new array */
    }

}