function footer(){
  var items = this.attr('items').split(' ');
  for(var i=0; i<items.length; i++){
    this.child(items[i++], items[i]=='#' ? 'span':'a', {href: items[i]}); 
  }
}
  // body.child('', '', {items:'terms /terms privacy /privacy &#9731; # api /api contact /contact', control:'footer'});
