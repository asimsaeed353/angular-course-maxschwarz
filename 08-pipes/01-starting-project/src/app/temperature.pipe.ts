import { output, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'temp',
    standalone: true,
})
export class TemperaturePipe implements PipeTransform {
    /*
    * Any pipe class can not work until it has a transform() 
    * in order to avoid typos and errors, we must implement PipeTransform class
    * transform() must return a transfromed value
    * pipe must accept at least one parameter cause it will be the value that is going to be transformed by the Pipe
    * the extra arguments that we pass to the pipe in the transform '...arg[]' are the configuration parameters. 
    */

    /* 
    * make this function convert Celcius to Far, F to Celcius
    * make one configuration as required
    */
    transform(
        value: string | number,
        inputType: 'cel' | 'fah',
        outputType?: 'cel' | 'fah'
    ) {
        let val: number;
        let outputTemp: number;

        // convert value into number for calculations
        if (typeof value === 'string'){
            val = parseFloat(value);
        } else {
            val = value;
        }

        // conversion from c to f
        if(inputType === 'cel' && outputType === 'fah'){
            outputTemp = val * (9 / 5) + 32;
        } else if (inputType === 'fah' && outputType === 'cel'){
            outputTemp = (val - 32) * (5 / 9);
        } else {
            outputTemp = val;
        }

        let symbol = 'C';
        
        if(!outputType){
            symbol = inputType === 'cel' ? 'C' : 'F';
        } else {
            symbol = outputType === 'cel' ? 'C' : 'F';
        }

        return `${outputTemp.toFixed(2)} °${symbol}`;

        /* you can chain pipes in the markup but it might not give you the desired results so the beter approach is just transrom the value inside the pip class */
    }
}