import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotesDataService, Page } from 'src/services/notes-data.service';
import { Utilities } from 'src/utils/utilities.class';

@Component({
    selector: 'app-page-editor',
    templateUrl: 'page-editor.component.html',
    styleUrls: ['page-editor.component.scss']
})

export class PageEditorComponent extends Utilities implements OnInit {
    BookID: number = 0;
    PageID: number = 0;
    Page: Page = new Page();

    constructor(private dataService: NotesDataService, private route: ActivatedRoute) {
        super();
    }

    getPageMetadata() {
        this.dataService.getPage(this.PageID).then(data => {
            if(data) {
                this.Page = data;
            }
        })
    }

    NotebookSaveInit: boolean = false;

    storeNotebook() {
        // this.NotebookSaveInit = true;
        // this.debounce('updateNotebook', 1000, () => {
        //     this.dataService.storeNotebook(this.Notebook).then(data => {
        //         this.NotebookSaveInit = false;
        //     });
        // })
    }
    
    saveNotebookDescription(DescriptionData: string | null) {
        // this.Notebook.DescriptionData = DescriptionData || '';
        // this.storeNotebook();
    }

    ngOnInit() {
        this.unSubscribeLater(this.route.queryParamMap.subscribe(params => {
            this.BookID = Number(params.get('BookID'));
            this.PageID = Number(params.get('PageID'));
            this.getPageMetadata();
        }));
    }
}