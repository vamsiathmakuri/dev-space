import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CodeEditorModule } from 'src/app/modules/@generic/code-editor/code-editor.module';
import { TextEditorModule } from 'src/app/modules/@generic/text-editor/text-editor.module';

import { PageEditorComponent } from './page-editor.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TextEditorModule,
        CodeEditorModule,
        RouterModule.forChild([{
            path: '',
            component: PageEditorComponent
        }])
    ],
    exports: [],
    declarations: [PageEditorComponent],
    providers: [],
})
export class PageEditorModule { }
