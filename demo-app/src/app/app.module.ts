import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DraftRichModule } from '../../../angular-draft-js/editors/rich.module';

import { AppComponent, Term, TermDef } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    Term,
    TermDef,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    DraftRichModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
