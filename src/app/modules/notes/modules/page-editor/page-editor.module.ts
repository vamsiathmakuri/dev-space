import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PageEditorComponent } from './page-editor.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
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
