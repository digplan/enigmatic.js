function tweet() {
  
  ondata.call(this);
  this.innerHTML = "<blockquote class='twitter-tweet'><a href='https://twitter.com/{{user}}/statuses/{{status}}'></a></blockquote>";
  this.hidden = true;
  load('//platform.twitter.com/widgets.js');

  if (this.attr('user') && this.attr('status'))
    this.render({user: this.attr('user'), status: this.attr('status')});

  load('//platform.twitter.com/widgets.js');
}
