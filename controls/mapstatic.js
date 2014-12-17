function mapstatic(){
 
    if(ondata)
      ondata.call(this);

    this.set = function(o){
      this.innerHTML = '<img src="https://maps.googleapis.com/maps/api/staticmap?center='+o.where+'&zoom=13&size=600x300&maptype=roadmap">';
    }

    this.set({where: this.attr('where')});

}

/* test 

body.innerHTML = '';
map = body.control('', 'mapstatic', {where:'chicago'}, 'two-high two');
body.controls();

setTimeout(function(){
  map.set({where: 'los angeles'});
}, 3000);
*/