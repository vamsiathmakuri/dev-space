import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TextEditorModule } from 'src/app/modules/@generic/text-editor/text-editor.module';

import { NotebookPreviewComponent } from './notebook-preview.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TextEditorModule,
        RouterModule.forChild([{
            path: '',
            component: NotebookPreviewComponent
        }])
    ],
    exports: [],
    declarations: [NotebookPreviewComponent],
    providers: [],
})
export class NotebookPreviewModule { }
