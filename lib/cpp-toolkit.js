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
    console.log( "test" );
    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-text-editor', {
        'cpp-toolkit:switchheader': () => this.switchheader(),
        'cpp-toolkit:newfile': () => this.newfile(),
        'cpp-toolkit:format': () => this.format(),
        'cpp-toolkit:tolower': () => this.tolower(),

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
      console.log( "enter switchheader" );
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
      if ( editor.getSelectedBufferRanges().length != 1 )
      {
          console.log( "we don't support multi buffers currently!" );
          return;
      }


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
      this.sformat( editor );
  },
  sformat( editor )
  {
      /*
      var selectedText = editor.getSelectedText();
      var rows = selectedText.split('\n');
      for ( var i = 0; i < rows.length; i ++ )
      {
          var row = rows[i];
          console.log( i + "[" + row + "]" );
          //////
          var ich = 0;
          var wordIdx = 0;

          while ( ich < row.length && row[ich] == " " )
          {
              ich = ich + 1;
          }
          //  TODO

          ichHead = ich;
          while( ich < row.length )
          {
              while ( (ich < row.length) && (row[ich] != " ") && (row[ich] != "=") && ich > 0 && row[ich-1] != "=" )
              {
                  ich = row.length;
                  wordIdx = 4;
                  break;
              }
              ich = ich + 1;
          }
          if ( wordIdx == 0 )
          {
              word0 = ich - ichHead;
          }
          else if ( wordIdx == 1 )
          {
              word1 = ich - ichHead;
          }
          else if ( )
      }
      */
  },
  tolower()
  {
      console.log("enter");
      var editor = atom.workspace.getActiveTextEditor();
      if ( typeof(editor) == undefined )
      {
          return;
      }
      if ( editor.getSelectedBufferRanges().length != 1 )
      {
          return;
      }
      var selectedText = editor.getSelectedText();
      var range = editor.getSelectedBufferRange();

      selectedText = selectedText.toLowerCase();
      editor.setTextInBufferRange( range, selectedText );
  }

};
