import * as React from 'react';

import { EditorState, ContentState, convertFromHTML } from 'draft-js';

import {
  Component,
  AfterContentInit,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';

import { ReactComponentWrapper } from './react.component';


export class DraftBase {
  @Input() editorClass: React.Component;

  // TODO: Type props?
  @Input() editorProps: any = {
    editorState: EditorState.createEmpty(),
  };

  @Input()
  set key(key: string) {
    this.editorProps = Object.assign({}, this.editorProps, { key: key });
  }
}


export class DraftHtmlBase extends DraftBase {
  @Input()
  set html(html: string) {
    const state: EditorState = this.stateFromHTML(html);
    this.editorProps = Object.assign({}, this.editorProps, { editorState: state });
  }

  @Output() htmlChange = new EventEmitter<{ string }>();

  ngOnInit() {
    this.editorProps = Object.assign({}, this.editorProps, {
      onChange: $event => { this.htmlChange.emit($event.html); },
    });
  }

  stateFromHTML(html: string): EditorState {
    const emptyState = EditorState.createEmpty();

    if (!html) { return emptyState; }

    const blocksFromHTML = convertFromHTML(html);

    let state: ContentState;

    try {
      const contentBlocks = blocksFromHTML.contentBlocks;
      const entityMap = blocksFromHTML.entityMap;
      state = ContentState.createFromBlockArray(contentBlocks, entityMap);
    } catch (e) {
      return emptyState;
    }

    return EditorState.createWithContent(state, this.editorProps.decorator);
  }
}


@Component({
  selector: 'draft',
  template: `
    <react-component
      [reactClass]="editorClass"
      [reactProps]="editorProps">
    </react-component>
  `,
  styleUrls: ['./draft-js.component.css'],
})
export class Draft extends DraftBase {}
