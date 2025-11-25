import { Routes } from "@angular/router";
import { TasksComponent } from "./tasks/tasks.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NewTaskComponent } from "./tasks/new-task/new-task.component";
import { NotFoundComponent } from "./not-found/not-found.component";

export const routes: Routes = [    
    {
        path: 'tasks', //<domain>/tasks
        component: TasksComponent
    },
    {
        path: 'users/:userId', //<domain>/users/<uid>
        component: UserTasksComponent,
        children: [
            {
                path: 'tasks', //<domain>/users/<uid>/tasks
                component: TasksComponent,
            },
            {
                path: 'tasks/new', //<domain>/users/<uid>/tasks/new
                component: NewTaskComponent,
            },
        ]
    },
    {
        path: '**',
        component: NotFoundComponent,
    }
    // routes are evaluated from top to bottom, so beware of the order of the tasks
    // order should be according to the increasing complexity from top to bottom
]