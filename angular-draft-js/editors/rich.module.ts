import { NgModule } from '@angular/core';
import { DraftJsModule } from '../draft-js.module';
import { DraftRich } from './rich.component';


@NgModule({
  imports: [
    DraftJsModule,
  ],
  declarations: [
    DraftRich,
  ],
  exports: [
    DraftRich,
  ],
})
export class DraftRichModule {}
