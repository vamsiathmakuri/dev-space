import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'notes',
  loadChildren: () => import('./modules/notes/notes.module').then(m => m.NotesModule)
}, {
  path: 'journal',
  loadChildren: () => import('./modules/journal/journal.module').then(m => m.JournalModule)
}, {
  path: '**',
  loadChildren: () => import('./modules/welcome/welcome.module').then(m => m.WelcomeModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
