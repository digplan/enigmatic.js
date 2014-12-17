
function filepickerio(){

    ondata.call(this);
    load('//api.filepicker.io/v1/filepicker.js');

}

/* test

must use https

body.innerHTML = '';
t = body.control('', 'filepickerio', {key: 'AYEAvo9QNSLu9ujF0D4rsz'}, 'four two-high');
t.id = 'datasrc';
a = t.child('Select file', 'a');
a.href='javascript:io=document.querySelector("filepickerio");filepicker.setKey(io.getAttribute("key"));filepicker.pick(io.dispatchData)';

function teststub(){
}
h = body.control('file name', 'teststub', {datafrom: 'datasrc', control: 'ondata'}, '');

body.controls();
*/