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

  constructor(private themeService: ThemeService) {
    super();
  }

  ngOnInit(): void {}

  toggleTheme() {
    this.themeService.toggleTheme()    
  }
}
