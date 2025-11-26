import { Component } from '@angular/core';


@Component({
  selector: 'app-servers', // works as a tag selector 
  // selector: '[app-server]', // attribute selector -> <di app-servers></div>
  // selector : '.app-server', // class selector <div class="app-server"></div>
  templateUrl: './servers.component.html',
  // template: '<app-server></app-server><app-server></app-server><app-server></app-server>',
  // you have to have either 'templateUrl or template' property 
  styleUrl: './servers.component.css',
})
export class ServersComponent {
  allowNewServer = false;
  serverCreationStatus = ''
  serverName = '';

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  onCreateServer() {
    this.serverCreationStatus = 'New server created. Name is ' + this.serverName;
  }

  onUpdateServerName(event: Event) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }
}
