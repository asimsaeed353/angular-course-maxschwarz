import { NgModule } from "@angular/core";
import { CardComponent } from "./card/card.component";

@NgModule({
    declarations: [CardComponent],
    exports: [CardComponent], // list all the components that you want to made available to all modules which are going to use this module
})
export class SharedModule {}