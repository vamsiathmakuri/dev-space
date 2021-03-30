import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Notebook, NotesDataService } from 'src/services/notes-data.service';
import { Utilities } from 'src/utils/utilities.class';


@Component({
    selector: 'app-notebook',
    templateUrl: 'notebook-preview.component.html',
    styleUrls: ['notebook-preview.component.scss']
})

export class NotebookPreviewComponent extends Utilities implements OnInit {
    BookID: number = 0;
    Notebook: Notebook = new Notebook();

    constructor(private dataService: NotesDataService, private route: ActivatedRoute) {
        super();
    }

    getBookMetadata() {
        this.dataService.getNotebook(this.BookID).then(data => {
            if(data) {
                this.Notebook = data;
            }
        })
    }

    NotebookSaveInit: boolean = false;

    storeNotebook() {
        this.NotebookSaveInit = true;
        this.debounce('updateNotebook', 1000, () => {
            this.dataService.storeNotebook(this.Notebook).then(data => {
                this.NotebookSaveInit = false;
            });
        })
    }
    
    saveNotebookDescription(DescriptionData: string | null) {
        this.Notebook.DescriptionData = DescriptionData || '';
        this.storeNotebook();
    }

    ngOnInit() {
        this.unSubscribeLater(this.route.queryParamMap.subscribe(params => {
            this.BookID = Number(params.get('BookID'));
            this.getBookMetadata();
        }));
    }
}