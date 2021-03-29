import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';

export class Journal {
    Date: string = "";
    Data: string = "";
    Modified: Date = new Date();
}


@Injectable({ providedIn: 'root' })
export class JournalDataService {

    constructor(private database: DatabaseService) { }

    getJournal(date: string): Promise<Journal>{
        let transaction = this.database.getObjectStore('journals').then(store => {
            return store.get(date)
        }).then(request => this.database.toPromise<Journal>(request))

        return transaction;
    }

    storeJournal(storeData: Journal) {
        let transaction = this.database.getObjectStore('journals').then(store => {
            return store.put(storeData)
        }).then(request => this.database.toPromise<string>(request))

        return transaction;
    }
}