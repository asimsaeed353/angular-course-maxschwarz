import { Component } from '@angular/core';

// this is going to be our root component so import the nested components here and register in 'imports[]'
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { DUMMY_USERS } from './dummy-users';
import { TasksComponent } from './tasks/tasks.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, UserComponent, TasksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  // since we are going to access the users in the app.component.html so define the property here.
  users = DUMMY_USERS;
  // selectedUserId = 'u1';
  selectedUser?: string;

  get getSelectedUser() {
    return this.users.find((user) => user.id === this.selectedUser);
  }

  onSelectUser(id: string){
    this.selectedUser = id;
  }
}
