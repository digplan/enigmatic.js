function template(){

  ondata.call(this);
  this.set = function(o){

    this.innerHTML = Hogan.compile(this.innerHTML).render(o);
    this.hidden = false;

  }

}

/*
test

body.innerHTML = '';
e = body.child();
e.setAttribute('control', 'template');
e.setAttribute('datafrom', 'aj');
e.innerHTML = 'Template says {{msg}}';
e.hidden = true;
a = body.child();
a.setAttribute('href', 'http://dpsw.info/data.json');
a.setAttribute('control', 'ajax');
a.id = 'aj';
body.controls();

*/