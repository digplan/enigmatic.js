/*
  <places id=myplaces api-key=KEY control></places>
  myplaces.onselected = (e) => alert(JSON.stringify(e));
*/

enig.places_cb = () => {
  var e = enig.places.count.shift();
  var input = e.child('input');
  input.style.width = '100%';
  input.style.height = '100%';
  input.onclick = () => input.select();
  input.onkeyup = (ev) => {
    if (ev.keyCode == 27) input.value = '';
  }
  var ac = new google.maps.places.Autocomplete(input, { types: ['geocode'] });
  ac.addListener('place_changed', () => {
    e.selected = ac.getPlace();
    if(e.onselected)
      e.onselected(ac.getPlace());
  });
  if (enig.places.count.length) enig.places_cb();
}

enig.places = (e) => {
  enig.load(`https://maps.googleapis.com/maps/api/js?key=${e.getAttribute('api-key')}&libraries=places&callback=enig.places_cb`);
  if (!enig.places.count) enig.places.count = [];
  enig.places.count.push(e);
}
