import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DatabaseService } from './database.service';

export class Notebook {
    BookID: number | undefined;
    BookName: string = "";
    DescriptionData: string = "";
    Modified: Date = new Date();
    Deleted: boolean = false;
    Pages: number[] = [];
}

export class Page {
    PageID: number | undefined;
    BookID: number = 0;
    PageName: string = "";
    PageType: string = "";
    PageLanguage: string = "";
    PageData: string = "";
    Modified: Date = new Date();
}


@Injectable({ providedIn: 'root' })
export class NotesDataService {
    NotebookUpdate: Subject<number> = new Subject<number>();

    constructor(private database: DatabaseService) { }

    getNotebook(BookID: number): Promise<Notebook> {
        let transaction = this.database.getObjectStore('notebooks').then(store => {
            return store.get(BookID)
        }).then(request => this.database.toPromise<Notebook>(request))

        return transaction;
    }

    getNotebooks(): Promise<Notebook[]> {
        let transaction = this.database.getObjectStore('notebooks').then(store => {
            return store.getAll()
        }).then(request => this.database.toPromise<Notebook[]>(request))

        return transaction;
    }

    getPage(PageID: number): Promise<Page> {
        let transaction = this.database.getObjectStore('pages').then(store => {
            return store.get(PageID)
        }).then(request => this.database.toPromise<Page>(request))

        return transaction;
    }

    getPagesByNotebook(BookID: number): Promise<Page[]> {
        const pages = this.database.getObjectStore('pages')
        
        const pageTransaction = pages.then(store => {
            return store.index('page_book_index').getAll(BookID)
        }).then(request => this.database.toPromise<Page[]>(request))
        
        return pageTransaction;
    }

    storePage(storeData: Page) {
        let transaction = this.database.getObjectStore('pages').then(store => {
            storeData.Modified = new Date();
            return store.put(storeData);
        })
            .then(request => this.database.toPromise<number>(request))

        return transaction;
    }

    addPageToNotebook(BookID: number, PageID: number) {
        let transaction = this.database.getObjectStore('notebooks').then(store => {
            return store.get(BookID);
        })
            .then(request => this.database.toPromise<Notebook>(request))
            .then(data => {
                let anotherTransaction = this.database.getObjectStore('notebooks').then(store => {
                    data.Pages.push(PageID);
                    return store.put(data);
                })
                    .then(request => this.database.toPromise<number>(request))
                    .then(data => {
                        this.NotebookUpdate.next(data)
                        return data;
                    })
                
                return anotherTransaction;
            })

        return transaction;
    }

    storeNotebook(storeData: Notebook) {
        let transaction = this.database.getObjectStore('notebooks').then(store => {
            storeData.Modified = new Date();
            return store.put(storeData);
        })
            .then(request => this.database.toPromise<number>(request))
            .then(data => {
                this.NotebookUpdate.next(data)
                return data;
            })

        return transaction;
    }
}