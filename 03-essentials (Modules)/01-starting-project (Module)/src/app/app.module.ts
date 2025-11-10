import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import {AppComponent} from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { TasksComponent } from './tasks/tasks.component';   
import { TaskComponent } from './tasks/task/task.component';
import { NewTaskComponent } from './tasks/new-task/new-task.component';

import { SharedModule } from './shared/shared.module';

@NgModule({
    declarations: [AppComponent, HeaderComponent, UserComponent, TasksComponent, TaskComponent, NewTaskComponent], // this array will contain all the components of this module
    bootstrap: [AppComponent], // bootstrap component to load the application from
    imports: [BrowserModule, FormsModule, SharedModule], // this array includes the standalone components and other imported modules
})
export class AppModule {

}