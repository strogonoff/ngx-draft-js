// TODO: Use .tsx

declare var require: any;

import * as React from 'react';

// This package lacks for type definitions
const stateToHTML = require('draft-js-export-html').stateToHTML;

import { Editor, EditorState, RichUtils } from 'draft-js';


export class RichEditor extends React.Component {

  // Silencing TS due to no easy way to include JS in the project
  // and issues with typings
  state: any;
  setState: (any) => void;
  props: any;
  refs: any;
  onChange: (e) => void;
  focus: (e) => void;
  handleKeyCommand: (e) => void;
  onTab: (e) => void;
  toggleBlockType: (e) => void;
  toggleInlineStyle: (e) => void;

  blockTypes: { string: string[] };
  inlineStyles: { string: string[] };

  constructor(props) {
    super(props);
    this.blockTypes = this.props.blockTypes || BLOCK_TYPES;
    this.inlineStyles = this.props.inlineStyles || INLINE_STYLES;
    this.state = { editorState: props.editorState };
    this.focus = () => this.refs.editor.focus();
    this.onChange = editorState => {
      this.setState({ editorState });
      props.onChange({ html: stateToHTML(editorState.getCurrentContent()) });
    };
    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.onTab = this._onTab.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
  }
  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }
  _onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }
  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }
  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }
  render() {
    const { editorState } = this.state;
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (
        contentState
          .getBlockMap()
          .first()
          .getType() !== 'unstyled'
      ) {
        className += ' RichEditor-hidePlaceholder';
      }
    }
    return React.createElement(
      'div',
      { className: 'RichEditor-root' },
      React.createElement(BlockStyleControls, {
        styles: this.props.blockTypes || BLOCK_TYPES,
        editorState: editorState,
        onToggle: this.toggleBlockType
      }),
      React.createElement(InlineStyleControls, {
        styles: this.props.inlineStyles,
        editorState: editorState,
        onToggle: this.toggleInlineStyle
      }),
      React.createElement(
        'div',
        { className: className, onClick: this.focus },
        React.createElement(Editor, {
          blockStyleFn: getBlockStyle,
          customStyleMap: styleMap,
          editorState: editorState,
          handleKeyCommand: this.handleKeyCommand,
          onChange: this.onChange,
          onTab: this.onTab,
          placeholder: this.props.placeholder,
          ref: 'editor',
          spellCheck: true
        })
      )
    );
  }
}
// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};
function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return null;
  }
}
class StyleButton extends React.Component {
  onToggle: (e) => void;
  props: any;

  constructor() {
    super();
    this.onToggle = e => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }
  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }
    return React.createElement(
      'span',
      { className: className, onMouseDown: this.onToggle },
      this.props.label
    );
  }
}
export const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
  {label: 'Code Block', style: 'code-block'},
];
const BlockStyleControls = props => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return React.createElement(
    'div',
    { className: 'RichEditor-controls' },
    props.styles.map(type =>
      React.createElement(StyleButton, {
        key: type.label,
        active: type.style === blockType,
        label: type.label,
        onToggle: props.onToggle,
        style: type.style
      })
    )
  );
};
export const INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'},
];
const InlineStyleControls = props => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  return React.createElement(
    'div',
    { className: 'RichEditor-controls' },
    props.styles.map(type =>
      React.createElement(StyleButton, {
        key: type.label,
        active: currentStyle.has(type.style),
        label: type.label,
        onToggle: props.onToggle,
        style: type.style
      })
    )
  );
};
