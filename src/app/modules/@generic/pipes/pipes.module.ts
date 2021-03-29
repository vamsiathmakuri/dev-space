import { NgModule } from '@angular/core';
import { LineCountPipe } from './lines.pipe';
import { WordCountPipe } from './words-count.pipe';


@NgModule({
    imports: [],
    exports: [
        WordCountPipe,
        LineCountPipe
    ],
    declarations: [
        WordCountPipe,
        LineCountPipe
    ],
    providers: [],
})
export class PipesModule { }
