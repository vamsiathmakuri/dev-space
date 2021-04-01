import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Notebook, NotesDataService, Page } from 'src/services/notes-data.service';
import { Utilities } from 'src/utils/utilities.class';

@Component({
    selector: 'notes-navigation',
    templateUrl: 'navigation.component.html',
    styleUrls: ['navigation.component.scss']
})

export class NavigationComponent extends Utilities implements OnInit {
    // Logic for Adding Notebooks
    showAddNotebookInput: boolean = false;
    newNotebookName: string = '';

    Notebooks: Notebook[] = [];
    NotebookPages: Page[] = [];

    SelectedNotebook: number = 0;
    SelectedPage: number = 0;

    @ViewChild('addNote')
    inputReference!: ElementRef<HTMLInputElement>;

    @Output('NavigationEvent')
    outputEvent: EventEmitter<{ BookID: number; PageID: number }> = new EventEmitter<{ BookID: number; PageID: number }>();

    constructor(private dataService: NotesDataService, private route: ActivatedRoute) {
        super();
    }

    showInput() {
        this.newNotebookName = '';
        this.showAddNotebookInput = true;
        setTimeout(() => {
            this.inputReference.nativeElement.focus()
        }, 100)
    }

    createNewNotebook() {
        if (this.newNotebookName) {
            // Create Note and Select
            const newNotebook = new Notebook();
            newNotebook.BookName = this.newNotebookName;
            this.dataService.storeNotebook(newNotebook).then(() => {
                this.getNotebooks();
            })

            this.showAddNotebookInput = false;
        }
    }

    selectNotebook(BookID: number = 0) {
        this.SelectedPage = 0;
        this.SelectedNotebook = BookID;
        this.getPages();
    }

    selectPage(BookID: number = 0, PageID: number = 0) {
        this.selectNotebook(BookID);
        this.SelectedPage = PageID;
    }

    triggerEvent() {
        this.outputEvent.emit({
            BookID: this.SelectedNotebook,
            PageID: this.SelectedPage
        });
    }

    getNotebooks() {
        this.dataService.getNotebooks().then(data => {
            this.Notebooks = data;
            this.getPages();
        })
    }

    getPages() {
        if(!this.SelectedNotebook) return;
        this.dataService.getPagesByNotebook(this.SelectedNotebook).then(data => {
            this.NotebookPages = data;
        })
    }

    createPage(PageType: string, PageLanguage: string = '') {
        const newPage = new Page();
        newPage.PageName = `Page ${this.NotebookPages.length + 1}`;
        newPage.PageType = PageType;
        newPage.PageLanguage = PageLanguage;
        newPage.BookID = this.SelectedNotebook;

        this.dataService.storePage(newPage).then(PageID => {
            return this.dataService.addPageToNotebook(this.SelectedNotebook, PageID).then(BookID => {
                this.selectPage(this.SelectedNotebook, PageID);
                this.triggerEvent();
            })
        })
    }

    ngOnInit() {
        this.getNotebooks();
        
        this.unSubscribeLater(this.dataService.NotebookUpdate.subscribe(data => {
            this.getNotebooks();
        }))

        this.unSubscribeLater(this.route.queryParamMap.subscribe(map => {
            const BookID = Number(map.get('BookID') || 0);
            const PageID = Number(map.get('PageID') || 0);
            if(this.SelectedNotebook !== BookID || this.SelectedPage !== PageID) this.selectPage(BookID, PageID);
        }));
    }
}