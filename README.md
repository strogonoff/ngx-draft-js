# ngx-draft-js: Angular bindings for Draft.js

[![Travis CI Build Status](https://travis-ci.org/strogonoff/ngx-draft-js.svg?branch=master)](https://travis-ci.org/strogonoff/ngx-draft-js)
&ensp;
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

**ngx-draft-js** is an Angular library that wraps Draft.js
and ships with a configurable WYSIWYG editor component.
The editor is based on the official Draft.js example,
with HTML as markup export format.

The library is functioning and being used in production,
but while it’s at version 1.x it should be considered unstable
(e.g., your AOT build might start failing if you’re lazy-loading
this library’s modules using Angular’s router).

[**Demo**](https://ngx-draft-js-demo-6aa62.firebaseapp.com/ "Showcases rich editor functionality with bindings")
&emsp;&emsp;
[NPM](https://www.npmjs.com/package/ngx-draft-js)
&emsp;&emsp;
[GitHub](https://github.com/strogonoff/ngx-draft-js/)

**What’s Draft.js?** Developed at Facebook, Draft.js is a React-based framework
for building rich text editors. Read more about it at http://draftjs.org.

## Installation

ngx-draft-js is intended to be added to Angular 5 projects.

React, React DOM and Draft.js are all specified as peer dependencies as well,
so add them yourself if you haven’t them in your project:

    yarn add react react-dom draft-js

Install the package:

    yarn add ngx-draft-js


## Using the rich text editor

Sample module definition:

```typescript
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
```

Basic usage in a component:

```typescript
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
```

### Component interface

Selector: ``draft-rich-html``

Bindings:

* ``[(html)]``: markup you get from the editor or initialize it with, HTML string
* ``[placeholder]``: self-explanatory, string
* ``[enableStyles]``: formatting options to display, a map of ``{ option label: boolean }`` (for possible labels see ``BLOCK_TYPES`` and ``INLINE_STYLES`` in [editors/rich.ts](https://github.com/strogonoff/ngx-draft-js/blob/master/angular-draft-js/editors/rich.ts))

See also: [**Demo**](https://ngx-draft-js-demo-6aa62.firebaseapp.com/).
