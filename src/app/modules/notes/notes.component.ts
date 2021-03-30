import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-notes',
    templateUrl: 'notes.component.html',
    styleUrls: ['notes.component.scss']
})
export class NotesComponent implements OnInit {
    constructor(private router: Router) { }

    ngOnInit() { }

    navigationEvent({ BookID, PageID }: { BookID: number, PageID: number }) {
        if (PageID && BookID) {
            this.router.navigate(['notes','page'], { queryParams: { PageID: PageID, BookID: BookID } });
        } else if (BookID) {
            this.router.navigate(['notes','notebook'], { queryParams: { BookID: BookID } });
        }
    }
}