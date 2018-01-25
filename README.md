# Angular bindings for Draft.js editor

**[Draft.js](http://draftjs.org)** is a React-based framework
for building rich text editors
developed at Facebook.

**ngx-draft-js** wraps Draft.js as an Angular library,
bundling configurable rich editor component based on the official Draft.js example
with an addition of HTML export via draft-js-export-html package.

## Installation

ngx-draft-js was tested with Angular 5.

React, React DOM and Draft.js are also specified as peer dependencies,
so add them yourself if you haven’t them in your project:

    yarn add react react-dom draft-js

Install the package itself:

    yarn add ngx-draft-js


## Using the rich text editor

Sample module definition:

    import { DraftRichModue } from 'ngx-draft-js';
    import { SomeComponentWithEditor } from './some.component';

    @NgModule({
        declarations: [
            SomeComponentWithEditor,
        ],
        imports: [
            DraftRichModule,
        ],
    })
    export class SomeModule {}


Basic usage in a component:

    @Component({
        template: `
            <draft-rich-html
                (html)="onHtmlChange($event)"
                placeholder="Write a story">
            </draft-rich-html>
        `,
    })
    export class SomeComponentWithEditor {
        onHtmlChange($event: string) {
            console.debug('Got new HTML from the Draft.js editor', $event);
        }
    }
