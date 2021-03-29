import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-notes',
    templateUrl: 'notes.component.html',
    styleUrls: ['notes.component.scss']
})
export class NotesComponent implements OnInit {
    temp: boolean = true;
    code: string = 'while (true) {\n\n}';

    constructor() { }

    ngOnInit() { }
}