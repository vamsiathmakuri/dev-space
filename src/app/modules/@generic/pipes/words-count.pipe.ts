import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'wordcount'
})

export class WordCountPipe implements PipeTransform {
    transform(value: string | undefined): number {
        return (value || '').replace(/\n+/g, ' ').split(' ').length;
    }
}