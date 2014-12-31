
function codeeditor(){
  load('//cdn.jsdelivr.net/ace/1.1.01/min/ace.js', function(){
    var par = body.control('editor');
    var ch = par.child('func', '', '',  {position:'absolute', top: '10px', right: '50px', bottom: '0px', left: '740px'});
    ch.id = 'editor';    
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/javascript");
  });
}

/*
body.innerHTML = '';
body.control('codeeditor');
*/