import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JournalDataService } from 'src/services/journal-data.service';

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
    JournalDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
