import { Directive, ElementRef, inject, input } from "@angular/core";

@Directive({
    selector: 'a[appSafeLink]', // target every anchor tag which has attribute 'appSafeLink
    standalone: true,
    host: {
        '(click)': 'onConfirmLeavePage($event)', // listen to click event. coule do @HostListen
    }
})
export class SafeLinkDirective {

    // take query parameter as input
    // queryParam = input('myapp');
    queryParam = input('myapp', {alias: 'appSafeLink'});

    // inject ElementRef Dependency
    private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

    onConfirmLeavePage(event: MouseEvent) {
        const wantsToLeave = window.confirm('Do You Want to Leave he Page?');

        if(wantsToLeave) {
            // add query parameter
            const address = this.hostElementRef.nativeElement.href;
            this.hostElementRef.nativeElement.href = address + '?from=' + this.queryParam();
            return ;

            //(event.target as HTMLAnchorElement) typecasting to convice typescript that this will be an HTML Anchor Element
        }
        
        event.preventDefault();
    }
}