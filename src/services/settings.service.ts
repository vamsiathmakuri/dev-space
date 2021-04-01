import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';

export interface Option<T> {
    Option: string;
    Value: T;
}

@Injectable({ providedIn: 'root' })
export class SettingsService {

    constructor(private database: DatabaseService) { }

    getOption<T>(key: string): Promise<T>{
        let transaction = this.database.getObjectStore('settings').then(store => {
            return store.get(key)
        }).then(request => this.database.toPromise<Option<T>>(request))
        .then(data => data && data.Value);

        return transaction;
    }

    storeOption<T>(key: string, value: T): Promise<string> {
        let transaction = this.database.getObjectStore('settings').then(store => {
            return store.put({
                Option: key,
                Value: value
            } as Option<T>)
        }).then(request => this.database.toPromise<string>(request))

        return transaction;
    }
}