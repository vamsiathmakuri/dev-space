import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document) {}
  
  ngOnInit(): void {}

  title: string = 'while';

  changeEvent(code: string) {
    this.title = code
  }

  event: any = null;

  toggleTheme() {
    let html = this.document.body.closest('html');
    const selectedTheme = html?.classList.contains('dark') ? 'dark' : 'light';
    html?.classList.remove(selectedTheme);
    html?.classList.add('theme-transition');
    html?.classList.add(selectedTheme == 'dark' ? 'light' : 'dark');
    clearTimeout(this.event);
    this.event = setTimeout(() => {
      html?.classList.remove('theme-transition');
    }, 1200);
  }
}
