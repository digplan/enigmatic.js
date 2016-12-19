/*
  <places id=myplaces api-key=AIzaSyCkUOdZ5y7hMm0yrcCQoCvLwzdM6M8s5qk control></places>
  myplaces.onselected = (e) => alert(JSON.stringify(e));
*/

enig.places = (e)=>{
  enig.load(`https://maps.googleapis.com/maps/api/js?key=${e.getAttribute('api-key')}&libraries=places`, ()=>{
    var input = e.child('input');
    input.id = 'placecontrol';
    var ac = new google.maps.places.Autocomplete(input, {types: ['geocode']});
    ac.addListener('place_changed', () => e.onselected(ac.getPlace()));
  })
}
