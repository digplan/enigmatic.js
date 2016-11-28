enig.gmap = (e) => {
  
  e.style.height = '100%';
  var ch = e.child();
  ch.id = 'mymap';
  
  enig.load(`https://maps.googleapis.com/maps/api/js?key=${e.getAttribute('apikey')}&callback=enig.gmap.initMap`);
  
  enig.gmap.initMap = () => {
      
      new google.maps.Map(window.mymap, {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
      });
  }
  
}