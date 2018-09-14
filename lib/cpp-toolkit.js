'use babel';

import CppToolkitView from './cpp-toolkit-view';
//import CppToolkitSelectListView from './cpp-toolkit-select-list-view';
import { CompositeDisposable,Directory,File, TextEditor } from 'atom';

export default {

  cppToolkitView: null,
  modalPanel: null,
  subscriptions: null,
  currentPath: "",
  lastPath: "",
  selectListView: null,

  activate(state) {
    this.cppToolkitView = new CppToolkitView(state.cppToolkitViewState);
    //this.selectListView = new CppToolkitSelectListView(state.CppToolkitSelectListViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.cppToolkitView,
      visible: true
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();
    console.log( "test" );
    var e = atom.workspace.getActiveTextEditor();
    if ( e )
    {
        this.lastPath = this.currentPath = e.getPath();
    }

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-text-editor', {
        'cpp-toolkit:switchheader': () => this.switchheader(),
        'cpp-toolkit:newfile': () => this.newfile(),
        'cpp-toolkit:format': () => this.format(),
        'cpp-toolkit:tolower': () => this.tolower(),
        'cpp-toolkit:openproto': () => this.openproto(),
        'cpp-toolkit:lastfile': () => this.lastfile(),
        'cpp-toolkit:movepane': () => this.movepane(),
        'cpp-toolkit:lastfiles': () => this.lastfiles(),
    }));


   atom.workspace.onDidChangeActiveTextEditor(editor => {
       if ( editor ) {
          this.lastPath = this.currentPath;
          this.currentPath = editor.getPath();
          console.log(  this.lastPath + " -> " + this.currentPath );
      }
   });
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
      var endRow = range.end.row + 1;
      if ( range.end.column == 0 )
      {
          endRow = range.end.row;
      }
      var newRange = [[range.start.row, 0], [endRow, 0]]
      editor.setSelectedBufferRange( newRange );
      this.sformatex( editor );
  },
  sformatex( editor )
  {
      var selectedText = editor.getSelectedText();
      var range = editor.getSelectedBufferRange();
      var rows = selectedText.split('\n');
      var fmtRow = [];
      var blank = "";
      var HeaderBlank = -1;
      var maxColumn = 7;
      for ( var i = 0; i < rows.length-1; i ++ )
      {
          var row = rows[i];
          if ( HeaderBlank == -1 )
          {
              var index = 0;
              while ( index < row.length && row[index] == " " )
              {
                  index = index + 1;
              }
              HeaderBlank = index;
              blank = row.substring(0,index);
          }
          var c1 = row.indexOf("/*");
          var c2 = row.indexOf("//");
          var commentBegin = -1;
          var comment = "";
          if ( c1 != -1 && c2 != -1 )
          {
              commentBegin = c1;
              if ( commentBegin > c2 )
              {
                  commentBegin = c2;
              }
          }
          else if ( c1 != -1 )
          {
              commentBegin = c1;
          }
          else if ( c2 != -1 )
          {
              commentBegin = c2;
          }
          var rowNoComment = row;
          if ( commentBegin != -1 )
          {
              rowNoComment = row.substring( 0, commentBegin );
              comment = row.substring( commentBegin );
          }

          var equalPos = rowNoComment.indexOf("=");
          var l = [];
          if ( equalPos == -1 )
          {
              l = l.concat(rowNoComment.split(" "));
          }
          else {
              l = l.concat(rowNoComment.substring(0, equalPos).split( " " ));
              l.push( "=" )
              if ( equalPos + 1 < rowNoComment.length ) {
                  l = l.concat(rowNoComment.substring( equalPos+1 ));
              }
          }
          if ( comment != "" )
          {
              l.push( comment );
          }

          //console.log( l );

          var L = [];
          var tail = "";
          for ( var j = 0; j < l.length; j ++ )
          {
              if ( l[j] == "" )
              {
                  continue;
              }
              if ( L.length < maxColumn )
              {
                  L.push( l[j] );
              }
              else {
                  if ( tail == "" ) tail = l[j];
                  else tail = tail + " " + l[j];
              }
          }
          if ( tail != "" )
          {
              L.push( tail );
          }
          fmtRow.push( L );
      }
      var maxEqualCol = -1;
      var width = new Array(maxColumn); // 7
      for ( var i = 0; i < width.length; i ++ )
      {
          width[i] = 0;
      }
      for ( var i = 0; i < fmtRow.length; i ++ )
      {
          for ( var j = 0; j < fmtRow[i].length && j <= 6; j ++ )
          {
              if ( fmtRow[i][j].length > width[j] )
              {
                  width[j] = fmtRow[i][j].length;
              }
          }
      }
      //console.log(blank.length);
      var out = [];
      for ( var i = 0; i < fmtRow.length; i ++ )
      {
          var line = blank;
          for ( var j = 0; j < fmtRow[i].length; j ++ )
          {
              //console.log( fmtRow[i][j] );
              if ( j < maxColumn )
              {
                  line = line + fmtRow[i][j];
                  if ( j != fmtRow[i].length -1 )
                  {
                      if ( fmtRow[i][j].length < width[j] )
                      {
                          for ( var x = 0; x < width[j]-fmtRow[i][j].length; x ++)
                          {
                              line = line + " ";
                          }
                      }
                      line += " ";
                  }
              }
              else {
                  if ( j != maxColumn )
                  {
                      line += " ";
                  }
                  line += fmtRow[i][j];
              }
          }
          out.push( line );
      }
      editor.setTextInBufferRange( range, out.join("\n") + "\n" );
  },
  sformat( editor )
  {
      /*
      var selectedText = editor.getSelectedText();
      var rows = selectedText.split('\n');
      var ich = 0;
      var wordIdx = 0;
      var word0 = 0;
      var word1 = 0;
      var word2 = 0;
      var word3 = 0;
      var word4 = 0;
      var word5 = 0;
      var PreBS = "";

      for ( var i = 0; i < rows.length; i ++ )
      {
          var row = rows[i];
          console.log( i + "[" + row + "]" );
          //过滤行首空格
          while ( ich < row.length && row[ich] == " " )
          {
              ich = ich + 1;
          }
          if ( i == 0 )
          {
              PreBS = row.substring(0,ich);
          }

          ichHead = ich;
          while( ich < row.length )
          {
              while ( (ich < row.length) && (row[ich] != " ") && (row[ich] != "=") && ich > 0 && row[ich-1] != "=" )
              {
                  if ( row[ich] == "/" && (row[ich+1] == "*" || row[ich+1] == "/") )
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
              else if ( wordIdx == 2 )
              {
                  word2 = ich - ichHead;
              }
              else if ( wordIdx == 3 )
              {
                  word3 = ich - ichHead;
              }
              else if ( wordIdx == 4 )
              {
                  word4 = ich - ichHead;
              }
              else if ( wordIdx == 5 )
              {
                  word5 = ich - ichHead;
              }
              else {
                  return;
              }
              if ( ich >= row.length )
              {
                  break;
              }
              if ( row[ich] == "=" )
              {
                  ichHead = ich;
                  ich = ich + 1;
              }
              else if ( row[ich] != " " && ich > 0 && row[ich-1] == "=" )
              {
                  ichHead = ich;
                  ich = ich + 1;
              }
              else {
                  while ( true )
                  {
                      ich = ich + 1;
                      if ( row[ich] != " " )
                      {
                          break;
                      }
                  }
                  ichHead = ich;
                  if ( row[ich] == "=" )
                  {
                      ich = ich + 1;
                  }

              }
              wordIdx = wordIdx + 1;
              if ( wordIdx > 6 )
              {
                  break
              }
          }

          if ( max0 < word0 )
          {
              max0 = word0;
          }
          if ( max1 < word1 )
          {
              max1 = word1;
          }
          if ( max2 < word2 )
          {
              max2 = word2;
          }
          if ( max3 < word3 )
          {
              max3 = word3;
          }
          if ( max4 < word4 )
          {
              max4 = word4;
          }
          if ( max5 < word5 )
          {
              max5 = word5;
          }

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
  },
  openproto() {

      console.log( "enter openproto" );
      var path = atom.workspace.getActiveTextEditor().getDirectoryPath();
      var dir = new Directory(path);
      if ( false == dir.isDirectory() )
      {
          return;
      }
      var fileToOpen = "";
      var files = dir.getEntriesSync();
      for ( var i = 0; i < files.length; i ++ )
      {
          var file = files[i];
          if ( file instanceof File )
          {
              var filePath = file.getPath();
              var dotPos = filePath.lastIndexOf('.');
              if ( dotPos == -1 ) {
                  continue;
              }
              var extName = filePath.substring( dotPos + 1 ).toLowerCase();
              if ( extName == 'proto' )
              {
                  fileToOpen = filePath;
              }
          }
      }
      if ( fileToOpen.length > 0 )
      {
          atom.workspace.open( fileToOpen );
      }

  },

  lastfile() {
      if ( this.lastPath.length > 0 )
      {
          atom.workspace.open( this.lastPath );
      }
  },

  movepane()
  {
      var panes = atom.workspace.getCenter().getPanes();
      var activePane = atom.workspace.getActivePane();
      var index = -1;
      for ( var i = 0; i < panes.length; i ++ )
      {
          if ( panes[i] === activePane )
          {
              index = i;
              break;
          }
      }
      if ( index == -1 )
      {
          return;
      }
      console.log( index );
      var nextPane = panes[(index + 1) % panes.length];
      if ( activePane.getActiveItem() instanceof TextEditor )
      {
          var item = activePane.getActiveItem();
          var itemIndex = activePane.getActiveItemIndex();
          console.log( nextPane );
          activePane.moveItemToPane( item, nextPane, itemIndex );
          console.log( nextPane );
          nextPane.activateItem( item );
          nextPane.activate();
      }
  },
  lastfiles() {
  }

};
// https://github.com/atom/fuzzy-finder/blob/master/lib/fuzzy-finder-view.js
// http://blog.jobbole.com/106919/
// https://github.com/atom/atom-select-list
