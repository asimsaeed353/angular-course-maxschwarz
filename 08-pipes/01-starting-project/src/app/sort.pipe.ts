import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  standalone: true
})
export class SortPipe implements PipeTransform {

  /* take a configuration paramter of either 'asc' or 'desc' and by default it is 'asc' */
  transform(value: string[] | number[], direction: 'asc' | 'desc' = 'asc'){
    const sorted = [...value];
    
    /* 
    * .sort() changes the array so copy the original array, make changes in the copy and return that sorted copied array 
    * .sort() takes a function which takes two arguments. in this function you have to return a value greater or smaller than zero. In this way the JS knows whether to arrange in ascending order or descending order. 
    * JS will compare every pair of values in the array and if 1 is returned then the sorting will be in ascending order.  
    */
    sorted.sort((a, b) => {
      if(direction === 'asc'){
        return a > b ? 1 : -1;
      } else {
        return a > b ? -1: 1;
      }

    });
    return sorted;
  }

}
