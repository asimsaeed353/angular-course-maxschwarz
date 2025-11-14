# Angular Course

## Section 2 - Angular Essentials

### 17. Managing and Creating Components with Angular CLI

    ng generate component <componentname>

OR short-hand 

    ng g c <componentname 

Example: 

    ng g c user

the above command will generate a component under `app/user/user.component.ts` and similarly `.html` and `.css` and `.spec.ts` for the **automated testing** file

### 21. Outputting Dynamic Content with Interpolation 

String interpolation allows you to render the dynamic data. in Angular, you can render the property of a class in the markup using double curly braces '{{  }}' 

### 22. Property Binding 

String interpolation is typically used between tags like `<h1>{{ selectedUser.name }}</h1>` and not used for *attributes* e.g. `<img src="{{ selectedUser.avatar }}" >`. Although you can use that but there is an alternative called Property Binding.

To configure the property of the DOM element to bind, we wrap the name of the element in double square brackets '[]' and assign the value to that attribute 

    <img [src]="'assets/users/' + selectedUser.avatar">

we can do this 

    <img src="assets/users/{{ selectedUser.avatar }}" alt="{{ selectedUser.name }}"/>

but this is better

    <img [src]="'assets/users/' + selectedUser.avatar" [alt]="selectedUser.name" />


#### Difference between Interpolation and Property Binding

With interpolation, you can do only **string** or **integer** manipulation. It does not deal with values for example *boolean* values. 

Let's take an example: you have a property in the component class which it *disable = false*. now in input tag's attribute **disabled** you pass it as 

    <input disabled="{{ disable }}" /> // this will read it as string and it will be always true

with Property Binding 

    <input [disabled]=disable /> // this will read 'disable' as false

To change the attribute or property, always use the **Property Binding**. 

### 27. How Angular tracks and make the UI changes 

`Zone.js` is a JS library. After every event (user events and others) **zone.js** looks for the changes to be made and updates the UI. When an async task completes, zone.js notifies Angular to run change detection. This ensures the UI updates automatically when data changes. Without zone.js, developers would need to manually trigger change detection.

### 28. Introducing Signals 

Signals are advance method of change detection and UI updates. Signals are Trackable Data Containers.

A Signal is an object that stores a value. Angular manages subscriptions to the signal to get notified about value changes. When a change occurs, Angular is the able to update the part of the UI that needs updating. 

They contains values, and they notify angular when those values change so Angular can update those parts of the UI where these values are being used. 

Whenever you are dealing with any property that stores a signal, you have to execute the property as a function to get the latest value for it. you can not access it like {{ selectUser.name }} rather you have to {{ selectUser().name }}

By using Signal, Angular can implement UI change in a fine grained way. Angular can now just look at specific parts of the app for the UI changes, and not all the possible parts of the application where an event could occur.

**Zone.js** -> notifies Angular about user events, expired timers etc. 
**Singals** -> notify Angular about when a signal values changes. 

### 30. Defining Component Inputs - Making Components Reusable

You can pass the dynamic data to the component, for that define the property in the .ts file with decorator @Input which will be imported from core. And then access this property and set the value of this property with the component tag.

```
export class UserComponent {

    @Input() avatar!: string;
    @Input() name!: string;

    // the '!' with property name is to tell typescript that we are going to set the value of this property from outside and that we know we have not initialized this property with any value.

    // image path getter
    get imagePath() {
        return "assets/users/" + this.avatar;
    }

    // define a function that handles the event (the name of the function may start with 'on')
    onClickUser() { }

}
```

    <app-user [avatar]="users[1].avatar" [name]="users[1].name"/>


### 32. Using Signal Inputs 

```
import { Component, computed, Input, input} from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  // @Input({required: true}) avatar!: string;
  // @Input({required: true}) name!: string;

  // @Input is a decorator 
  // input() is a function

  // setting inputs with input()
  avatar = input.required(); 
  name = input.required(); 

  imagePath = computed(() => {
    return "assets/users/" + this.avatar();
  });
  
  // * we do not need exclamation with the propery name because technically the 'avatar' and 'name' now have initial values assigned to them which are these signal inputs and since the signals are data container they internally hold some value and those internal values will be the actual input values

  // * name and avatar now has become signals and in component we now access these inputs as 'name()' and not 'name'

  // * these input signals are read only, which means that the value of these inputs will only change when the value is given from the component markup. and you can not set the value of these inputs inside the components class where inputs are registered i.e. in .ts file. 
  // * Reason ? since with signals, angular manages subscriptions and track changes and updates UI. so the signal has to be changed from the outside and it will not be efficient if it can be changed from anywhere

  // - avatar = input(); // define an input 
  // - avatar = input(''); // you can pass any initial value to the input 
  // - avatar = input<string>(); // you can define the type of the input 
  // - avatar = input.required(); // you can make it required but then you can not assign any initial value to the input and it has to be passed to the component as attribute
  // - avatar = input.required<string>(); 

  // image path getter
  // get imagePath() {
  //   return "assets/users/" + this.avatar;
  // }

  // define a function that handles the event (the name of the function may start with 'on')
  onClickUser() {
    this.avatar = 'one';
   }

}

```

Majority of the projects does not use signals yet. they mostly use @Input


### 41. Outputting List Content Dynamically in Angular

    <ul id="users">
        @for (user of users; track user.id){
        <li>
            <app-user
            [user]="user"
            (select)="onSelectUser($event)"
            />
        </li>
        }
    </ul>

The reason behind the `track user.id` is that the Angular wants to assign something unique to each element of the list, and the other thing is because of efficiency. For example, if there is change in list of items, the Angular won't have to generate the whole list again and again. So, that's the idea behind the track use.id 

### 43. Legacy Angular: Using ngFor & ngIf

``` 
Newer version:

<ul id="users">
    @for (user of users; track user.id){
      <li>
        <app-user
          [user]="user"
          (select)="onSelectUser($event)"
        />
      </li>
    }
  </ul>
```

```
Legacy with *ngFor:

<ul id="users">
      <li *ngFor="let user of users">
        <app-user
          [user]="user"
          (select)="onSelectUser($event)"
        />
      </li>
  </ul>
```

`*ngFor` is type of **Structual Directive** which is an enhancement that is added to elements to change those elements or change the DOM where those elements are used.

And now for `@if` is `ngIf`

```
Newer version:
@if(getSelectedUser){
    <app-tasks [name]="getSelectedUser.name" />
  } @else {
    <p id="fallback">Ssssssssssss</p>
  }
```

```
Legacy:
<app-tasks *ngIf="selectedUser; else anyfallback" [name]="selectedUser.name" />

<!--- this is else case --->
    <ng-template #anyfallback>
      <p id="fallback">Ssssssssssss</p>
    </ng-template>
```
`else` case is a bit complex.

Note: Make sure to import the NgFor and NgIf in .ts file


### 43. More Component Communication: Deleting Tasks

Flow of event, in `task.html` file, listen for the click event on the complete button, link a function `onCompleteTask()` to this click event and in this function, emit an output event. Then in the `tasks.html` file, listen for this new event and link that event to a function in `tasks.ts` file.

### 52. Using Directives & Two-Way-Binding

`[(ngModel)]` is a directive that supports **Two-Way Binding** and is added to the `<input>` element to enhance it's properties and to get the input.  
It gives access to the value entered by the user in the input, and also *allows you to write data back to the input*. That is what **Two-Way Binding** means (listen to input but also output data, both with one syntax i.e. `[(ngModel)] = propToBind`).   
Do not forget to import `FormsModule` from '@angular/forms';    
You can track each keystroke of the user when he/she is inputting any value (live).   
Inputs in HTML always yield a **string**.

### 56. Content Projection with ng-content

If you have a component and you want to tell angular that i will have some content in this, you can use the placeholder as like

```
card.component.html
<div>
  <ng-content>
</div>
```  
`<ng-content>` will act as a placeholder and it will be replaced by the markup wrapped by this component.

### 57. Transforming Template Data with Pipes

Pipes are *output transformers*. They transform the output in the templates to improve how data is displayed 

  <time>{{ task.dueDate | date:'fullDate'}}</time>

`:fullDate` is for the configuration purposes and you also need to import `*DatePipe*` from `'@angular/common'`.


### 58. Getting Started with Services

The idea behind services is make a class which holds the data and the opertaions to be done on that data by different components. so separating the data and the data operations from our components to make our code base leaner. 

### 59. Getting Started with Dependency Injection

The idea behind **dependency injection** is that you do not create the instance yourself. Instead, you tell Angular that you need such an instance, and Angular creates it. Angular can create this instance once, and you can use this single instance in different components, thus operating on the same data.

#### Using the Constructor for Dependency Injection   

How do we tell Angular that we want such an instance? We add a constructor function to the class, which is a special method executed automatically when the class is instantiated. Angular executes this constructor when it instantiates the component used in a template.

### 60. More Service Usage & Alternative Dependency Injection Mechanism

- Approach 1 - Constructor method    
```
constructor(private tasksService: TasksService){}
```

- Approach 2 - inject() method  
*// inject a dependency and initiate an instance with inject() and not the constructor approach*
```
private tasksService = inject(TasksService);
```


### 83. Passing Data from Parent to Child with Inputs

Flow: To pass data from child to parent, use an event emitter and pass the data from child to parent component. parent component then does something with that data and using a custom property, made the data available by the child components in the parent component file. 

```
<app-header />
<app-user-input (calculate)="onCalculateInvestmentResults($event)" />
<app-investment-results [results]="resultData" />
```

### 94. Exploring the Angular DevTools

Install the `Angular Dev Tools` extenstion from `https://angular.dev/tools/devtools` and add to the chrome, It will add another tab **Angular** to the developer tools in the chrome browser where you can debug your code and also measure the performance of your application etc. 

**Angular DevTools** is a browser extension that provides debugging and profiling capabilities for Angular applications.

### 101. Property Binding 

#### Difference of @Input and input()

note: with `@Input()` -> you access the property as in component markup as `img.src`
while with the `input()` -> since it is a signal now, so you access the property as `img().src`

    export class DashboardItemComponent {
      // define an object for image src and image alt text
      // @Input({required: true}) img!: {src: string; altText: string};
      // @Input({required: true}) headingText!: string;

      // note: with @Input() -> you access the property as in component markup as img.src
      // while with the input() -> since it is a signal now, so you access the property as img().src

      // alternatively
      img = input.required<{src: string; altText: string}>();
      headingText = input.required<string>();
    }

Whenever you bind the property in '[]' like 
    <app-dashboard-item [img]="{ src:'list.png', altText:'A list of items' }" [headingText]="Support Tickets">

You are telling the angular that the code after []= and inside `""` should be evaluated as *TypeScript* code. Angular would read the content inside `""` as TypeScript variable and tries to assign any value to that. In order to avoid that you can use `''` inside double quotes as 

    <app-dashboard-item [headingText]="'Support Tickets'">

    // Alternatively
    <app-dashboard-item headingText="Support Tickets">

    // if you need to assign a simple string, you should not use property binding.


### 104. A Possible, But Not Ideal Way Of Extending Built-in Elements

One issue with components is if you make a *button* component which contains markup of an `<button>`, when rendering this component, in the DOM, there will be one tag of your component and then under that, there will be markup which the component contains i.e. the HTML `<button>`. So our DOM contains a number of redunant tags of component names. So there might be better way of exteniding buil-in Elements such as `<button>`.

### 105. Extending Built-in Elements with Custom Components via Attribute Selectors

This is used usually to extend the funtionality of the built-in element.

Selectors are not only limited to app selectors. You can also make for example **Attribute Selectors** and whenever you give that attribute to any element, the angular will take control of it. There can be *class selector* too depending upon your needs. Let's see and example of the *Attribute Selector* which we are going to use to extend the funtionality of the built-in element `<button>` in our case.

    @Component({
      selector: 'button[appButton]',
      standalone: true,
      imports: [],
      templateUrl: './button.component.html',
      styleUrl: './button.component.css'
    })

In the above code, we are telling angular that whichever `<button>` has the attribute `appButton`, angular should take control of that.   
Similarly, in order to target all the `<button>` which has `button` class, the selector will be as    

    selector: 'button.button',


### 111. Understanding & Configuring View Encapsulation

**Shadow DOM** : A browser feature that allows you to attach hidden DOM structures to the DOM elements.   
For example, the built-in `<video>` element hides a more complex DOM tree that's used internally  
For CSS styling, the Shadow DOM can be used to scope CSS styles to that hidden tree - instead of applying styles globally to the entire page.  
**Angular** can *emulate* this Shadow DOM browser feature for its own components. 

#### Understanding Angular's Style Scoping
By default, Angular scopes component styles to the component they belong to. This means styles cannot affect elements outside the component or projected content. To have styles affect projected inputs and text areas elsewhere in the application, we need to adjust the style encapsulation settings.

#### Configuring View Encapsulation
To fix the styling issue, we add the encapsulation setting to the control component's decorator. This setting takes a value from the ViewEncapsulation enum, which is a TypeScript feature representing a collection of possible values. We import ViewEncapsulation from @angular/core and set the encapsulation property accordingly.

#### ViewEncapsulation Options
##### Emulated (default): Angular emulates the browser's Shadow DOM behavior, scoping styles to the component.
##### ShadowDom: Uses the real browser Shadow DOM feature, which is not supported by all browsers.
##### None: Disables style encapsulation, making styles global and able to affect projected content.
Disabling Style Encapsulation to Fix the Issue
By setting encapsulation: ViewEncapsulation.None in the control component, the styles become global. This allows the styles defined in the component's CSS to affect the inputs and text areas projected into the component, fixing the styling issue.


### 112. Making Sense of Component Host Elements

Every Angular component has a host element, which is simply the element selected by the component's selector. For the `control component`, the host element is the `app-control` element. Inspecting the page and selecting the input shows that the input is inside a paragraph, which is inside the app-control element. That is the host element of the control component.   
You can target the host element styles using `:host` selector in CSS.    
The special `:host` selector is a *CSS feature* that should be known when working with Angular, as it **allows direct application of styles to the rendered host element**.


### 114. Interacting With Host Elements From Inside Components

How to give a `class` property to user component selector from the .ts file.     
The following code work: 

      <app-control class="control" label="Title">

note the `class="control"` , but we have to give all the component tags this class. There can be a better way i.e. we can pass this property in the component's typescript file as

    @Component({
      selector: 'app-control',
      host: {
        class: 'control'
      },
    })


### 115. When (Not) To Rely On Host Elements

It happens often that in order to apply styles to a component, we enclose the component markup inside a wrapper and then give the wrapper an id or class to target that element in CSS styles. However this cause some redundancy because we can target our component tag e.g. for `ControlComponent` we can target `<app-control>` in CSS Styles using `:host` rather than targetting a wrapper. This approach is alternative to assigning class to the component tag from inside the component class. 

```html
  <p>Last 7 days</p>

  <div id="chart">
    @for (dataPoint of dummyTrafficData; track dataPoint.id) {
      <div [style.height]="(dataPoint.value / maxTraffic) * 100 + '%'"></div>
      }
  </div>
  <!-- You can see there is no wrapper around the markup and the wrapper styles will be applied targetting :host -->
```

```css
  :host {
    display: block;
    width: 15rem;
  }
```


### 116. Interacting with Host Elements via @HostListener & @HostBinding

Following are two ways of setting a host's (Component's) property and listen to any specific event on the host.   
```typescript
  // 1) in the component decorator
  @Component({
    selector: 'app-control',
    standalone: true,
    imports: [],
    templateUrl: './control.component.html',
    styleUrl: './control.component.css',
    encapsulation: ViewEncapsulation.None, //disable the encapsulation to apply the component styles globally
    host: {
      class: 'control', // set property of the host
      // '(click)': 'onClick()', // listen to the click event on the component
    },
  })

```

```typescript
  // 2) via @HostListener & @HostBinding
  export class ControlComponent {
    /* There is an alternative way to set host properties, this is discourged and exists only for backward compatibility reason */
    @HostBinding('class') className = 'control';
    
    /* Alternate way to listen to an event occured on the host */
    @HostListener('click') onClick() {
      console.log('Clicked!');
    } 

    label = input.required<string>();

    // onClick() {
    //   console.log('Clicked!');
    // }
  }
```

### 117. Accessing Host Elements Programmatically

To access the host element programmatically, we inject `ElementRef` class. The ElementRef object provides a nativeElement property that references the actual DOM element.
Direct manipulation of the DOM via ElementRef should be done cautiously; prefer data binding and template features for UI updates.
Injection can be done via the inject function or constructor injection, both provided by Angular. 



### 120. A Closer Look At Dynamic Inline Style Binding and CSS class Binding

```html
  <div [class]="{
    status: true,
    'status-online': currentStatus === 'online',
    'status-offline': currentStatus === 'offline',
    'status-unknown': currentStatus === 'unknown',
  }"
      [style]="{
          fontSize: '64px',
      }"
  >
  </div>

  <!-- Or this will also work [style.fontSize]="'64 px'" -->
  <!-- note that the value inside the double quote "" will be evaluated as typescript code so enclose it in single quotes '' -->
```

Another example: 
```html
  <div [style.height]="(dataPoint.value / maxTraffic) * 100 + '%'"></div>
```


### 121. Manipulating State & Using Literal Values

#### Literal Types

Allows you to assign only specific (string) values to a variable. The variable will not accept any value other than the specified values. 

```typescript
  currentStatus: 'online' | 'offline' | 'unknown' = 'online';
  // currentStatus will accept only one out of three specified values.
```

### 122. Introducing the Component Lifecycle: ngOnInit

ngOnInit method will be executed by Angular whenever Angular has initialized this component's inputs. So whenever it essentially is done initializing this component.
`ngOnInit`	Runs once after Angular has initialized all the component's inputs.   

#### ngOnInit
The ngOnInit method runs after Angular has initialized all the components inputs with their initial values. A component's ngOnInit runs exactly once.

This step happens before the component's own template is initialized. This means that you can update the component's state based on its initial input values.

### 125. Component Cleanup with ngOnDestroy

In our component, we have a time interval function that we want to clear when our components is destroyed. To catch the point when the component will be destroyed, we use one of *Component Lifecycle Hook* i.e. `ngOnDestroy`.   

#### How to clear timeout interval?  
`setInterval()` return a **NodeJS.Timeout**. we can make a private class property that will store the return of *setInterval()* and when the component will be destroyed, we will clear this time interval function.


### 126. Component Cleanup with DestroyRef

Elegant alternative of `ngOnDestroy()`, with `DestroyRef` we can add listener that will be triggered when the component is about to be destroyed. Using this, we can add such listeners at number of places inside our class as compared to only one time using `ngOnDestroy()`.    
**Angular** allows you to inject a special value into your components known as a `DestroyRef`. This can be injected either via the constructor or by using the inject function. The type to inject is DestroyRef, which is imported from *@angular/core*.

By injecting DestroyRef and storing it in a property, you can set up a listener that *triggers a function whenever the component is about to be destroyed.* This listener serves as an alternative to the ngOnDestroy method.


```typescript
export class ServerStatusComponent implements OnInit {
  currentStatus: 'online' | 'offline' | 'unknown' = 'online';

  // compnent cleanup using DestroyRef
  private destroyRef = inject(DestroyRef);
  // now we can listen to component destroy event and execute any function we want to execute when component is about to be destroyed.

  constructor() {}
  // keep your constructor clean and use for initializing values 

  // for complex tasks, use 
  ngOnInit() {
    console.log('ON INIT');
    const interval = setInterval(() => {
      const rnd = Math.random(); // 0 - 0.9999999
      
      if(rnd < 0.5){
        this.currentStatus = 'online';
      } else if (rnd < 0.9) {
        this.currentStatus = 'offline';
      } else {
        this.currentStatus = 'unknown';
      }
    }, 5000);

    // add a listner here, to execute some code when the comonent is about to be destroyed. similary we can add such listener at some other place in our class. 
    this.destroyRef.onDestroy(() => {
      clearInterval(interval);
    });
  }

  ngAfterViewInit(){
    console.log("AFTER VIEW INIT");
  }
}
```


### 128. Working with Template Variables

Previously, we have seen that to get the value of the form input, we used *Two-Way Binding* using `[(ngModel)]`. We can use the **Template Variables**. Tempate variable gives us the whole DOM Element, it an be Input or TextArea. You mark an input field as **Template Variable** by assigning it a name starting with a '#' symbol.

```html
<form (ngSubmit)="onSubmit(titleInput)">
  <app-control label="Title">
    <input name="title" id="title" #titleInput />
  </app-control>
```

```typescript
export class NewTicketComponent {

  // capute the form input value(s) using Template Variables
  onSubmit(titleElement: HTMLInputElement) {
    const titleValue = titleElement.value;
    console.dir(titleValue);
  }
}
```


### 130. Template Variables & Component Instances

If you put **Tempalte Variable** on an HTML element, you get the instance of HTMLElement. For example if template variable is on the `<textarea>`, then you get the instance of HTML Textarea component. 
```html
<textarea name="request" id="request" rows="3" #textInput></textarea>
```

However, if you put the Template Variable on the *Angular Component*, angular has taken control of it and you no longer gets the instance of HTML Element, rather you get the instance of **Angular Component**. 

```html
<button appButton #btn>
  Submit
  <span ngProjectAs="icon">⌲</span>
</button>

<!-- since button is no longer an HTML Element, rather it is an Angular Componen. So, in Template Variable we get the instance of Component and not the HTML Element. -->
```


### 131. Getting Access to Template Elements via ViewChild

Previously, in the view file i.e. Template file of the component we had to pass the template variabled to the function we bound to the event. However there is an alternate and easy way using `@ViewChild`. It allows you to access the template variable from the template or view file in your component class and you do not need to pass those variables to any event binder in the template file. 

Component View/Template file:
```html
<form (ngSubmit)="onSubmit(titleInput.value, textInput.value)" #form>
  <app-control label="Title">
    <input name="title" id="title" #titleInput />
  </app-control>
```
Component Class:
```typescript
  export class NewTicketComponent {

  @ViewChild('form') form?: ElementRef<HTMLFormElement>;
  // in the paranthesis, you need to pass the name of the template variable assigned in the template file.

    // capute the form input value(s) using Template Variables
  onSubmit(titleElement: string, textElement: string) {
    console.dir('TITLE: ' + titleElement);
    console.dir('TEXT: ' + textElement);

    // form.reset(); // if you pass the form element from the event binder in the template file

    this.form?.nativeElement.reset();
  }
}
```

### 133. ViewChild vs ContentChild

Using `@ViewChild()` or `viewChild()` we targetted the elements or components that are part of the component view or template file. However, in case of `<ng-content>` which is actually a *placeholder* and used to **project content in the component class** and the projected content is also not part of the component view or template file.   
For `<ng-content>`, we use the @ContentChild() to get hold of the **Template Variables** e.g. *input* and *textarea* of the `<ng-content select="input, textarea" />` inside the component class.

```html
<!-- component view -->
<label>{{ label() }}</label>
<ng-content select="input, textarea" />
```

```html
<!-- component being used -->
<app-control label="Title">
  <input name="title" id="title" #titleInput #input />
</app-control>
<app-control label="Request">
  <textarea name="request" id="request" rows="3" #textInput #input ></textarea>
</app-control>
```

```typescript
// inside Component class

// @ContentChild('input') private control?: ElementRef<HTMLInputElement | HTMLTextAreaElement>;
/* inside the paranthesis, give the name of the element or template variable to hold control of */

/* signal alternative */
private control = contentChild<HTMLInputElement | HTMLTextAreaElement>('input');

onClick() {
  console.log(this.control());
}
```

### 134. A Closer Look at Decorator-based Queries & Lifecycle Hooks

#### Purpose of AfterViewInit

The idea behind this hook is that within it, you are guaranteed to have access to the elements that have been selected with `ViewChild`, unless you specified a selector that cannot be found. You are guaranteed that the template has been initialized and that **Angular** is able to select elements in there.

On the other hand, if you also implement the `OnInit` interface and add the `ngOnInit` method, it is not guaranteed that this element exists yet. If you log inside ngOnInit and try to access the native element, you will see that it is undefined.

#### Purpose of AfterContentInit

`AfterContentInit` and add the `ngAfterContentInit` method, I can safely access content that has been projected into the component, assuming I have a correct selector.

This applies whether you are using the *ContentChild function* or the *ContentChild decorator*.

### 136. The afterRender and afterNextRender Lifecycle Functions

The purpose of both hooks is to *allow user to execute some function while anything changes in whole website. The hooks we had discussed previously were tracking the changes on the component level.   
`afterRender:` executes functions whenever or wherever anything changes inside the app. *anything*   

`afterNextRender` : executes only when there is next change in the app.  

They were introduced with Angular 16. 

```typescript
export class ControlComponent {

  constructor() {

    afterNextRender(() => {
      console.log('After Next Render');
    });

    afterRender(() => {
      console.log("After Render");
    });
  }
}
```

### 137. Making Sense of Signal Effects

Sometimes, it is necessary to set up a subscription in TypeScript, but it does not happen automatically. Angular provides the `effect` function for this purpose. The `effect` function is imported from *Angular* core and can be executed in the constructor.

```typescript
import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';   

export class ServerStatusComponent implements OnInit {
currentStatus = signal<'online' | 'offline' | 'unknown'>('offline');

constructor() {
  effect(() => {
      console.log(this.currentStatus());
  });
}
```

The `effect` allows us to run code when signal value changes.


### 150. Understanding Directives 

**Directives** are *enhancements* for elements (both built-in and or components). They can change configuration(properties, attributes), styling or behavior of elements. For example
```html
<input name="title" ngModel>
<!-- in the above tag, ngModel enhances the input element and allows two way binding -->
```

Directives do not have a template while components are directives but with a template. 


### 153. Analyzing a Built-in Structural Directive: ngIf

Structural directives start with an asterisk "\*". Structural Directives change the DOM. In modern Angular, there are no built-in *structural directives* left anymore. We use `@if` in place of `*ngIf` and `@for` in place `*ngFor`.

```html
<p *ngIf="isAdmin()">Only admins should see</p>
```


### 156. Working with Inputs in Custom Directives

Directive can take *input* and can also *output* just like the components.   
**Typecasting** in Typescript. 
```typescript
  (<value> as <type>)
  // example
  const address = (event.target as HTMLAnchorElement).href
```

Using Alias for input name:
- Approach 1
```typscript
@Directive({
    selector: 'a[appSafeLink]', // target every anchor tag which has attribute 'appSafeLink
    standalone: true,
    host: {
        '(click)': 'onConfirmLeavePage($event)', // listen to click event. coule do @HostListen
    }
})

export class SafeLinkDirective {

    // take query parameter as input
    queryParam = input('myapp');
}
```
Let's take input for this `queryParam`
```html
<a href="https://angular.dev" appSafeLink queryParam="myapp-docs-link">Angular Documentation</a>
```

- Approach 2
Use the name of the attribute as the input storage:   
```typescript
queryParam = input('myapp', {alias: 'appSafeLink'});
```

```html
<a href="https://angular.dev" appSafeLink="myapp-docs-link">Angular Documentation</a>
<!-- use alias to get the input rather than the property name -->
```

### 158. Building Another Directive

`effect()` encloses the code to run whenver some signal values changes. 


### 159. Building a Custom Structural Directive

`<ng-template>` is included in a template file and it allows us to do not show some content initially (when the page loads.) You can control when to show content that is enclosed inside this tag.   
With `<ng-template>`, if you use any structual directive such as `ngIf`, you do not need to put `*` before it. `*` is just a syntactic sugar to add `<ng-template>` behind the scenes.
```html
<!-- approach 1 -->
 <p *ngIf="....">........</p>


<!-- approach 2 -->
<ng-template ngIf="....">
  <p>........</p>
</ng-templat>
```

#### Three steps to build a custom structural directive 
- HTML File (app.component.html in our case) 
```html
<!-- approach 1 -->
<ng-template appAuth="admin">
  <p>If you can see this, then you are an admin.</p>
</ng-template>

 <!-- approach 2 -->
 <p *appAuth="'admin'">If you can see this, then you are an admin.</p>
```

- directive component class
```typescript
/* 
  * if you have used the <ng-template> in the template file you need to delcare it here that you want to use that in the template
  * Injecting a `TemplateRef` tells Angular that this directive i.e. `appAuth` will be used on an ng-template element and that we want to get hold of that template and implicitly also the content inside of that template. 
  * By injecting the ViewContainerRef type or class , we get a reference to the place in the DOM where this template is being used
  */
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);

  /* 
  * createEmbeddedView(this.templateRef) => tells Angular to render some new content into a certain place in the DOM.
  => this function tells the angular to take markup inside the <ng-template> and render it where this directive (i.e. appAuth in our case) is used in the DOM 

  * viewContainerRef.clear() => clears any embedded view that has been rendered.

  */
  constructor() {
    /* run some code in effect() whenever a signal value changes */
    effect(() => {
      if(this.AuthService.activePermission() === this.userType()){
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    });
```

### 161. Host Directives & Composition

#### For Attribute Directives

Suppose we have an *attribute directive* `appLog` which has class `LogDirective`. If we want to add this to any component e.g `<app-auth>`, we need to add it as
```html
<app-auth-user appLog />
```
Now if we have 100 such tags, we will have to add attribute `appLog` 100 times and that is quite some repitition.    
**Solution**: Just import the structural directive and add the Class name inside the component configuration in the `<any>.component.ts` file as 
```typescript
// in the configuration file of the component 
@Component({
  selector: 'app-auth',
  //,

  hostDirectives: [LogDirective],
})
```
The `hostDirectives` property allows directives to be composed and applied automatically to components or other directives, reducing repetitive directive usage.
Now, you do not need to add `appLog` in the markup of this component select i.e. `<app-auth>

#### For Structural Directives

For *structural directives*, there is no `hostDirectives:[]` so we have to use it as it's selector name (e.g. `appAuth`) for example:
```html
<app-component appSomeStructDirec />
```

#### Merge Structual And Attribute Directives

You can define an *Attribute Directive* and then import it in another *directive* probably in an *structural directive*. Directives can be injected into components or other directives **to add shared behavior**, such as logging clicks on host elements.

```typescript 
@Directive({
  selector: '[appSafeLink]',
  hostDirectives: [LogDirective]
})
export class SafeLinkDirective {}

// LogDirective is a structural directive
```

### 171. Understanding How Pipes Are Executed

**Angular** caches the result of the *transform()* method of the Pipe in order to avoid running pipes with every change in the App. Pipe will only run if the input value changes.     

#### What happens when you pass an array to the Pipe?
When you passs an array to the Pipe, you actually *pass the reference of the array in the memory to the Pipe*. So, when you change any element of the array , the reference you passed does not change and Angular still uses the **cached result** returned by the Pipe. So for angular or for Pipe, the array does not change. If you want the Pipe to run *transform()* again on any change in the array, then you need to change the array in some specific way. Instead of overwriting one or two desired elements, you actually need to *overwrite()* the whole array.

```typescript 
onReset(index: number) {
  /* overwriting a single element of the array (pipe's transform() would not be triggered again) */
  // this.historicTemperatures[index] = 18;

  /* overwrite whole array in order to execute the pipe functionality cause pipe will work only if the whole input changes */
  const temp = [...this.historicTemperatures];
  temp[index] = 18;
  this.historicTemperatures = temp;
}
```