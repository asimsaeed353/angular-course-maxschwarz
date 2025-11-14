import { inject, Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';
import { LogService } from '../log.service';

@Injectable({
    providedIn: 'root', // makes it accessible from anywhere in the app
})
export class TasksService {

    /* mark the tasks private so it is writeable only in this service class and makes only read-only signals in the components where the service will be injected */
    private tasks = signal<Task[]>([]);
    allTasks = this.tasks.asReadonly(); // yield only read-only signals 

    private logginService = inject(LogService);

    addTask(taskData: {title: string, description: string}){
        const newTask: Task = {
            ...taskData, 
            id: Math.random().toString(),
            status: 'OPEN'
        }

        this.tasks.update((oldTasks) => [...oldTasks, newTask]);
        this.logginService.log("ADDED TAKS WITH TITLE " + taskData.title);
    }

    updateTaskStatus(taskId: string, newStatus: TaskStatus) {
        this.tasks.update((oldTasks) => oldTasks.map((task) => task.id === taskId ? {...task, status: newStatus} : task));
        this.logginService.log("TASK WITH ID " + taskId + " HAS THIS STATUS " + newStatus);

        /* .map() takes a function, loops through each element of the array and returns a new array */
    }

}