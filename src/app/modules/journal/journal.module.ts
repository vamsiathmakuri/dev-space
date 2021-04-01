import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JournalDataService } from 'src/services/journal-data.service';
import { PipesModule } from '../@generic/pipes/pipes.module';
import { TextEditorModule } from '../@generic/text-editor/text-editor.module';

import { JournalComponent } from './journal.component';

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: '',
            component: JournalComponent
        }]),
        PipesModule,
        CommonModule,
        TextEditorModule
    ],
    exports: [],
    declarations: [JournalComponent],
    providers: [
        JournalDataService
    ],
})
export class JournalModule { }
