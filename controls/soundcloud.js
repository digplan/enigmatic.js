function soundcloud() {
  
  this.template = '<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/{{id}}&amp;color=ff6600&amp;auto_play=false&amp;show_artwork=true"></iframe>';

  this.set = function(obj) {

    var html = this.template.replace('{{id}}', obj.id);
    this.innerHTML = html;

  }
  
  this.attr('id') && this.set({id: this.attr('id')});

}

/* test
body.innerHTML = '';
window.t = body.control('', 'soundcloud', {id: '121966611'}, 'four two-high');
body.controls();

// test set
setTimeout(change, 3000);

function change(){
  window.t.set({id:'143443476'});
}

*/