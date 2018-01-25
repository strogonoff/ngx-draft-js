# Angular bindings for Draft.js editor

ngx-draft-js wraps React-based Draft.js as an Angular 5 component,
bundling a rich editor from the official Draft.js example
with an addition of HTML export via draft-js-export-html package.

Draft.js is a framework for building rich text editors
developed by Facebook.

## Installation

ngx-draft-js was tested with Angular 5.

React, React DOM and Draft.js are specified as peer dependencies,
so add them yourself if you haven’t them in your project:

    yarn add react react-dom draft-js

Install the package itself:

    yarn add ngx-draft-js


## Using bundled rich text editor

Import Angular module:

    import { DraftRichModue } from 'angular-draft-js/editors/rich.module';

    @NgModule({
        imports: [
            DraftRichModule,
        ],
    })
    export class SomeModule {}


Use rich editor in a component:

    <draft-rich-html (html)="onHtmlChange($event)" placeholder="Write a story"></draft-rich-html>
