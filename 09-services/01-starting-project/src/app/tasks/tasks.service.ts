import { Injectable, signal } from '@angular/core';
import { Task } from './task.model';

@Injectable({
    providedIn: 'root', // makes it accessible from anywhere in the app
})
export class TasksService {
    tasks = signal<Task[]>([]);

    addTask(taskData: {title: string, description: string}){
        const newTask: Task = {
            ...taskData, 
            id: Math.random().toString(),
            status: 'OPEN'
        }

        this.tasks.update((oldTasks) => [...oldTasks, newTask]);
    }

}