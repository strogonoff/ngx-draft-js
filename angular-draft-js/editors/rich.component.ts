import { Component, Input } from '@angular/core';
import { DraftHtmlBase } from '../draft-js.component';
import { RichEditor, INLINE_STYLES, BLOCK_TYPES } from './rich';


@Component({
  selector: 'draft-rich-html',
  template: `
    <draft [editorClass]="editorClass" [editorProps]="editorProps"></draft>
  `,
  styleUrls: [
    '../draft-js.component.css',
    './rich.component.css',
  ],
})
export class DraftRich extends DraftHtmlBase {
  editorClass = RichEditor;
  editorProps = { inlineStyles: INLINE_STYLES, blockTypes: BLOCK_TYPES };

  @Input()
  set placeholder(placeholder: string) {
    this.editorProps = Object.assign({}, this.editorProps, { placeholder: placeholder });
  };

  @Input()
  set enableStyles(styleMap: { string: boolean }) {
    this.editorProps = Object.assign({}, this.editorProps, {
      inlineStyles: INLINE_STYLES.filter(opt => styleMap[opt.label]),
      blockTypes: BLOCK_TYPES.filter(opt => styleMap[opt.label]),
    });
  }
}
