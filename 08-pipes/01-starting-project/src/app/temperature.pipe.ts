import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'temp',
    standalone: true,
})
export class TemperaturePipe implements PipeTransform {
    /*
    * Any pipe class can not work until it has a transform() 
    * in order to avoid typos and errors, we must implement PipeTransform class
    * transform() must return a transfromed value
    */

    transform(value: any, ...args: any[]) {
        return value + ' - transformed';
    }
}