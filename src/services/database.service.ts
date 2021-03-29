import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class DatabaseService {
    DevSpaceDatabase: Promise<IDBDatabase> = new Promise((resolve, reject) => {
        const databaseRequest = indexedDB.open('DevSpace', 1);
        databaseRequest.onupgradeneeded = () => {
            if (!databaseRequest.result.objectStoreNames.contains('journals')) {
                const journals = databaseRequest.result.createObjectStore('journals', { keyPath: 'Date' });
                // const journalIndex = journals.createIndex('journal_index', 'id');
            }
        }

        databaseRequest.onerror = () => {
            reject(databaseRequest.error);
        };


        databaseRequest.onsuccess = () => {
            resolve(databaseRequest.result)
        };
    })

    constructor() {}

    toPromise<T>(transaction: IDBRequest) {
        return new Promise<T>(function (resolve, reject) {
            transaction.onsuccess = function () {
                resolve(transaction.result);
            }
    
            transaction.onerror = function () {
                reject(transaction.error);
            }
        })
    }
    
    getObjectStore(store: string): Promise<IDBObjectStore> {
        return this.DevSpaceDatabase.then(db => {
            return db.transaction(store, "readwrite").objectStore(store);
        })
    }
}