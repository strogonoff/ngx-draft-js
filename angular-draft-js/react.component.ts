import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
  Component,
  AfterContentInit,
  ElementRef,
  Input,
} from '@angular/core';


@Component({selector: 'react-component', template: ''})
export class ReactComponentWrapper implements AfterContentInit {

  @Input() reactClass: React.Component;

  // Trigger render in props setter (React way: rerender whenever props change).
  // TODO: Use a more explicit way of triggering render?
  // Currently this relies on assigning to reactProps in order to trigger render:
  // something like
  // ``this.props = Object.assign({}, this.props, { someProp: 'someValue' } });``
  // is needed, can’t simply assign do ``this.props.someProp = 'someValue';``
  @Input()
  set reactProps(props: any) {
    this._props = props;

    this.renderReact();
  }
  get reactProps() {
    return this._props;
  }
  protected _props: any;

  constructor(private ref: ElementRef) {}

  renderReact() {
    ReactDOM.render(
      React.createElement(this.reactClass, this._props),
      this.ref.nativeElement);
  }

  ngAfterContentInit() {
    this.renderReact();
  }

}
