import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'linecount'
})

export class LineCountPipe implements PipeTransform {
    transform(value: string): any {
        return value.split('\n').length;
    }
}