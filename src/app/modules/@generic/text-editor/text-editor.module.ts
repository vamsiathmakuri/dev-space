import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

import { TextEditorComponent } from './text-editor.component';

@NgModule({
    imports: [
        QuillModule.forRoot(),
        FormsModule
    ],
    exports: [
        TextEditorComponent
    ],
    declarations: [
        TextEditorComponent
    ],
    providers: [],
})
export class TextEditorModule { }
