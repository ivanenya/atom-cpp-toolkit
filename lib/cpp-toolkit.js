'use babel';

import CppToolkitView from './cpp-toolkit-view';
import { CompositeDisposable } from 'atom';

export default {

  cppToolkitView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.cppToolkitView = new CppToolkitView(state.cppToolkitViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.cppToolkitView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
        'cpp-toolkit:switchheader': () => this.switchheader(),
        'cpp-toolkit:newfile': () => this.newfile(),
        'cpp-toolkit:format': () => this.format(),
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.cppToolkitView.destroy();
  },

  serialize() {
    return {
      cppToolkitViewState: this.cppToolkitView.serialize()
    };
  },

  switchheader() {
      var filePath = atom.workspace.getActiveTextEditor().getPath();
      var dotPos = filePath.lastIndexOf('.');
      if ( dotPos == -1 ) {
          return;
      }
      var fileName = filePath.substring( 0, dotPos );
      var extName = filePath.substring( dotPos + 1 ).toLowerCase();
      var newExtName = '';
      if ( extName === 'h' ) newExtName = 'cpp';
      else if ( extName === 'hpp' ) newExtName = 'cc';
      else if ( extName === 'cpp' ) newExtName = 'h';
      else if ( extName === 'cc' ) newExtName = 'hpp';
      else if ( extName === 'c' ) newExtName = 'h';
      else return;

      var newFilePath = fileName + '.' + newExtName;
      atom.workspace.open( newFilePath );
  },

  newfile() {
      console.log( "enter newfile" );
      console.log( "enter newfile" );
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
  },

  format() {
      console.log("enter");
      var editor = atom.workspace.getActiveTextEditor();
      if ( typeof(editor) == undefined )
      {
          return;
      }

      var selectedText = editor.getSelectedText();
      console.log( selectedText );
      //var ranges = editor.getSelectedBufferRanges();
      //for ( var i = 0; i < ranges.length; i ++ )
      {
          var range = editor.getSelectedBufferRange();
          var pointStart = range.start;
          var pointEnd = range.end;
          if ( pointStart.row < pointEnd.row || pointStart.row == pointEnd.row && pointStart.column <= pointEnd.column )
          {

          }
          else {
              var point = pointStart;
              pointStart = pointEnd;
              pointEnd = point;
          }
          range.start = pointStart;
          range.end = pointEnd;
          var newRange = [[range.start.row, 0], [range.end.row+1, 0]]
          editor.setSelectedBufferRange( newRange );
      }
  }
};
