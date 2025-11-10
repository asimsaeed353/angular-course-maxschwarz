import { Component } from '@angular/core';

// Decorators like 'Component' are used by Angular to add the metadata and configuration to the classes

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html', 
    styleUrl: './header.component.css'
})

/* 
- for Angular version < 19, the 'standalone' property is by default true which marks this component as "Stand Alone Component". 

- there are other type of components e.g. Module Based Components

*/
// you can write inline HTML in 'template' property but only if the markup contains two or three lines max

/*  ------ Styles ------

- to define inline styles => styles: ['h1 { color: red }']
- to define a single stylesheet => styleUrl: './name.component.css'
- to define an array of multiple stylesheets => styleUrls: ['./name.component.css']

*/

export class HeaderComponent {}