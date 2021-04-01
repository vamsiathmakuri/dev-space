import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatabaseService } from 'src/services/database.service';
import { SettingsService } from 'src/services/settings.service';
import { ThemeService } from 'src/services/theme.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PipesModule } from './modules/@generic/pipes/pipes.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PipesModule
  ],
  providers: [
    ThemeService,
    DatabaseService,
    SettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
