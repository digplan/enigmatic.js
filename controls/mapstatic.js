function mapstatic(){
 
    ondata.call(this);
    this.innerHTML = '<img src="https://maps.googleapis.com/maps/api/staticmap?center={{where}}&zoom=13&size=600x300&maptype=roadmap">';
    this.attr('where') && this.render({where: this.attr('where')});

}

/* test 

body.innerHTML='';
body.control('mapstatic', {where: 'vegas'})

*/