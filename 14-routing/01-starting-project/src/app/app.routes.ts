import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";
import { routes as userRoutes } from "./users/user.routes"; 
import { TasksComponent } from "./tasks/tasks.component";
import { resolveTitle, resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { inject } from "@angular/core";

const dummyCanMatch: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const shoudlGetAccess = Math.random();
  if(shoudlGetAccess < 0.5){
    return true;
  }
  return new RedirectCommand(router.parseUrl('/unauthorized'));
};

export const routes: Routes = [    
    {
        path: 'tasks', //<domain>/tasks
        component: TasksComponent
    },
    {
        path: 'users/:userId', //<domain>/users/<uid>
        component: UserTasksComponent,
        children: userRoutes,
        // canMatch: [dummyCanMatch],
        data: {
            message: 'Hello',
        },
        resolve: {
            userName: resolveUserName,
        }, 
        title: resolveTitle
    },
    {
        path: '**',
        component: NotFoundComponent,
    }
    // routes are evaluated from top to bottom, so beware of the order of the tasks
    // order should be according to the increasing complexity from top to bottom
]