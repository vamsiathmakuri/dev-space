import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ThemeService {
    Theme: BehaviorSubject<string> = new BehaviorSubject<string>('dark');
    ThemeList: string[] = ['dark', 'light']
    constructor() { }
}