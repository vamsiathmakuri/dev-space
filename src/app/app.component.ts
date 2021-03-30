import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ThemeService } from 'src/services/theme.service';
import { Utilities } from 'src/utils/utilities.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends Utilities implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document, private themeService: ThemeService) {
    super();
  }

  ngOnInit(): void {
    this.unSubscribeLater(this.themeService.Theme.subscribe(selectedTheme => {
      let html = this.document.body.closest('html');

      for(let themeName of this.themeService.ThemeList) {
        html?.classList.remove(themeName);
      }

      html?.classList.add(selectedTheme);
    }))
  }



  toggleTheme() {
    const newTheme = this.themeService.Theme.value != 'dark' ? 'dark' : 'light';
    this.themeService.Theme.next(newTheme);
  }
}
