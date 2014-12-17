function tweet() {
  
  this.template = "<blockquote class='twitter-tweet'><a href='https://twitter.com/{{user}}/statuses/{{status}}'></a></blockquote>";

  this.set = function(obj) {
    
    var html = this.template.replace('{{user}}', obj.user).replace('{{status}}', obj.status);
    this.innerHTML = html;
    load('//platform.twitter.com/widgets.js');

  }
  
  if (this.attr('user') && this.attr('status')) {
    
    this.set({user: this.attr('user'),status: this.attr('status')});
  
  }

  load('//platform.twitter.com/widgets.js');

}

/*  test

body.innerHTML = '';
window.t = body.control('', 'tweet', {user: 'digplan',status: '545005898205503488'}, 'four two-high');
body.controls();

// test set
setTimeout(change, 3000);

function change(){
  window.t.set({user:'digplan', status:'545020015733268480'});
}

*/