import * as md5 from 'md5';
import { Component, AfterContentInit } from '@angular/core';

import { RichEditor, INLINE_STYLES, BLOCK_TYPES } from '../../../angular-draft-js/editors/rich';

import * as html from 'html';
import { js_beautify } from 'js-beautify';
import { AllHtmlEntities } from 'html-entities';


const htmlEntities = new AllHtmlEntities();

// In these strings whitespace and linebreaks are important,
// as they will be rendered inside of a <pre>.
const configHead = htmlEntities.encode(`@Component({template: \`
  <draft-rich-html
    [(html)]="html"
`);
const configPrePlaceholder = htmlEntities.encode(`[placeholder]="`);
const configPostPlaceholder = htmlEntities.encode(`"`);
const configPreStyles = htmlEntities.encode(`[enableStyles]="{`);
const configPostStyles = htmlEntities.encode(`}"></draft-rich-html>`);
const configFoot = htmlEntities.encode(`\`})
class NgxDraftDemo {
`);


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  configHead = configHead;
  configPrePlaceholder = configPrePlaceholder;
  configPostPlaceholder = configPostPlaceholder;
  configPreStyles = configPreStyles;
  configPostStyles = configPostStyles;
  configFoot = configFoot;

  placeholder = 'Draft.js placeholder';

  availableStyleNames: string[] = [
    ...INLINE_STYLES.map(opt => opt.label),
    ...BLOCK_TYPES.map(opt => opt.label),
  ];

  enabledStyles: { string: boolean } = Object.assign({},
    ...this.availableStyleNames.map(name => { return { [name]: true } }),
  );

  private _html = '<p><br></p>';
  set html(html: string) {
    this._html = html;
    this.updateBeautifiedHtml();
  }
  get html(): string {
    return this._html;
  }

  prettyHtml: string;

  updateBeautifiedHtml() {
    const beautified: string = html.prettyPrint(this._html || '');
    this.prettyHtml = htmlEntities.encode(beautified);
  }

  toggleStyle(styleName: string) {
    this.enabledStyles = Object.assign({}, this.enabledStyles, {
      [styleName]: !this.enabledStyles[styleName],
    });
  }

  // When we’re modifying Draft.js contents from outside,
  // we’ll update its React component key to trigger full re-render
  key: string;
  computeNewKey() {
    this.key = md5(this.html);
  }
}


@Component({selector: 'term', template: '<ng-content></ng-content>'})
export class Term {}

@Component({selector: 'term-def', template: '', styles: [`:host { display: none; }`], })
export class TermDef {}
