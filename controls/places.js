/*
  <input style='height:100%;width:100%' id=from api-key=AIzaSyDiZXiGMnzU_slDA40hA2-1XTEZHsUdA9s control=places></input>
   e.selected = ...
*/

enig.places_cb = () => { 
  var e = enig.places.count.shift();
  e.onclick = () => e.select();
  e.onkeyup = (ev) => {
    if (ev.keyCode == 27) e.value = '';
  }
  var ac = new google.maps.places.Autocomplete(e, { types: ['address'] });
  ac.addListener('place_changed', () => {
    e.selected = ac.getPlace();
  });
  if (enig.places.count.length) enig.places_cb();
}

enig.places = (e) => {
  enig.load(`https://maps.googleapis.com/maps/api/js?key=${e.getAttribute('api-key')}&libraries=places&callback=enig.places_cb`);
  if (!enig.places.count) enig.places.count = [];
  enig.places.count.push(e);
}
