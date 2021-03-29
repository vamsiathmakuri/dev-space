import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SampleComponent } from 'src/app/modules/notes/components/sample-component/sample.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { TextComponent } from './components/text-component/text.component';
import { QuillModule } from 'ngx-quill'
import { NotesComponent } from './notes.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([{
            path: '',
            component: NotesComponent
        }]),
        QuillModule.forRoot(),
        FormsModule
    ],
    exports: [],
    declarations: [
        NotesComponent,
        NavigationComponent,
        SampleComponent,
        TextComponent
    ],
    providers: [],
})
export class NotesModule { }
