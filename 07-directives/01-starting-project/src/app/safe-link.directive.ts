import { Directive } from "@angular/core";

@Directive({
    selector: 'a[appSafeLink]', // target every anchor tag which has attribute 'appSafeLink
    standalone: true,
    host: {
        '(click)': 'onConfirmLeavePage($event)', // listen to click event. coule do @HostListen
    }
})
export class SafeLinkDirective {
    constructor() {
        console.log('This is safe link directive.');
    }

    onConfirmLeavePage(event: MouseEvent) {
        const wantsToLeave = window.confirm('Do You Want to Leave he Page?');

        if(wantsToLeave) {
            return ;
        }
        
        event.preventDefault();
    }
}