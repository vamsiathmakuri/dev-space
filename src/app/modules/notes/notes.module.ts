import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { QuillModule } from 'ngx-quill'
import { NotesComponent } from './notes.component';
import { NotesDataService } from 'src/services/notes-data.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([{
            path: '',
            component: NotesComponent,
            children: [{
                path: 'notebook',
                loadChildren: () => import('./modules/notebook-preview/notebook-preview.module').then(m => m.NotebookPreviewModule)
            }, {
                path: 'page', 
                loadChildren: () => import('./modules/page-editor/page-editor.module').then(m => m.PageEditorModule)
            }]
        }]),
        QuillModule.forRoot(),
        FormsModule
    ],
    exports: [],
    declarations: [
        NotesComponent,
        NavigationComponent
    ],
    providers: [
        NotesDataService
    ],
})
export class NotesModule { }
