import { NgModule } from '@angular/core';
import { ReactComponentWrapper } from './react.component';
import { Draft, DraftHtmlBase } from './draft-js.component';


@NgModule({
  declarations: [
    ReactComponentWrapper,
    Draft,
  ],
  exports: [
    ReactComponentWrapper,
    Draft,
  ],
})
export class DraftJsModule {}
