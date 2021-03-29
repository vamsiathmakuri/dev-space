import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ContentChange, QuillEditorComponent } from 'ngx-quill';

@Component({
    selector: 'app-text-editor',
    templateUrl: 'text-editor.component.html',
    styleUrls: ['text-editor.component.scss']
})

export class TextEditorComponent implements OnInit, OnChanges {

    modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean', 'code-block', 'formula'],                                         // remove formatting button

            ['link', 'image', 'video']                         // link and image, video
        ]
    };

    @Input("Data") Data: string = '';
    @Output("OnContentChange") contentChangeEvent: EventEmitter<ContentChange> = new EventEmitter<ContentChange>();

    content: string = '';

    rawText: string = '';

    constructor() { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['Data']) {
            this.ngOnInit();
        }
    }

    ngOnInit() {
        this.content = this.Data;
    }

    onContentChange(data: ContentChange) {
        this.contentChangeEvent.emit(data);
    }
}