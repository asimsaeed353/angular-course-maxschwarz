import { Routes } from "@angular/router";
import { routes as userRoutes } from "./users/user.routes"; 
import { TasksComponent } from "./tasks/tasks.component";
import { UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";

export const routes: Routes = [    
    {
        path: 'tasks', //<domain>/tasks
        component: TasksComponent
    },
    {
        path: 'users/:userId', //<domain>/users/<uid>
        component: UserTasksComponent,
        children: userRoutes,
    },
    {
        path: '**',
        component: NotFoundComponent,
    }
    // routes are evaluated from top to bottom, so beware of the order of the tasks
    // order should be according to the increasing complexity from top to bottom
]