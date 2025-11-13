import { Directive } from "@angular/core";

@Directive({
    selector: 'a[appSafeLink]', // target every anchor tag which has attribute 'appSafeLink
    standalone: true,
})
export class SafeLinkDirective {
    constructor() {
        console.log('This is safe link directive.');
    }
}