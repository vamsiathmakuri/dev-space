import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    template: ''
})
export abstract class Utilities implements OnDestroy {
    Subscribers: Array<Subscription> = [];
    
    ngOnDestroy(): void {
        for(let subscriber of this.Subscribers) {
            subscriber.unsubscribe();
        }
    }

    extendedOnDestroy() {
        // Override this method to add additional functionality to OnDestroy lifecycle hook
    }

    // Always Use following helper while making a subscriber to unregister subscribers when component destroys.
    unSubscribeLater(subscriber: Subscription): Subscription {
        this.Subscribers.push(subscriber);
        return subscriber;
    }

    intervals: any = {};

    debounce(name: string, ms: number, handler: Function) {
        clearInterval(this.intervals[name]);
        this.intervals[name] = setTimeout(handler, ms);
    }
}