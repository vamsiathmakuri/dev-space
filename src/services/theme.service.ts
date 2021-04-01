import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SettingsService } from './settings.service';

@Injectable({providedIn: 'root'})
export class ThemeService {
    Theme: BehaviorSubject<string> = new BehaviorSubject<string>('dark');
    ThemeList: string[] = ['dark', 'light']
    SETTINGS_KEY: string = 'Theme';

    constructor(@Inject(DOCUMENT) private document: Document, private settings: SettingsService) {
        this.Theme.subscribe(selectedTheme => {
            this.setTheme(selectedTheme);
        })

        this.settings.getOption<string>(this.SETTINGS_KEY).then(data => {
            if(data) {
                this.Theme.next(data);
            }
        })
    }

    setTheme(theme: string) {
        let html = this.document.body.closest('html');
        
        for(let themeName of this.ThemeList) {
            html?.classList.remove(themeName);
        }
    
        html?.classList.add(theme);
    }

    toggleTheme(store: boolean = true) {
        const newTheme = this.Theme.value != 'dark' ? 'dark' : 'light';

        if(store) {
            this.settings.storeOption<string>(this.SETTINGS_KEY, newTheme).then(data => {
                this.Theme.next(newTheme);
            })
        } else {
            this.Theme.next(newTheme);
        }
    }
}