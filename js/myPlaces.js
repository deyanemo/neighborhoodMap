 var places = [{
  name: 'Berlin Wall',
  lat: 52.535052,
  lng: 13.390190,
  title: 'Berlin Wall',
  id: '1'
 }, {
  name: 'Alexanderplatz',
  lat: 52.521918,
  lng: 13.413215,
  title: 'Alexanderplatz',
  id: '2'
 }, {
  name: 'Brandenburg Gate',
  lat: 52.516275,
  lng: 13.377704,
  title: 'Brandenburg Gate',
  id: '3'
 }, {
  name: 'Berlin Victory Column',
  lat: 52.514543,
  lng: 13.350119,
  title: 'Berlin Victory Column',
  id: '4'
 }, {
  name: 'Berlin Cathedral',
  lat: 52.519061,
  lng: 13.401078,
  title: 'Berlin Cathedral',
  id: '5'
 }, {
  name: 'Reichstag building',
  lat: 52.518620,
  lng: 13.376187,
  title: 'Reichstag building',
  id: '6'
 }, {
  name: 'Pergamon Museum',
  lat: 52.521183,
  lng: 13.396900,
  title: 'Pergamon Museum',
  id: '7'
 }, {
  name: 'Checkpoint Charlie',
  lat: 52.507593,
  lng: 13.390369,
  title: 'Checkpoint Charlie',
  id: '8'
 }, {
  name: 'East Side Gallery',
  lat: 52.505022,
  lng: 13.439695,
  title: 'East Side Gallery',
  id: '9'
 }, {
  name: 'Berlin Zoological Garden',
  lat: 52.507920,
  lng: 13.337755,
  title: 'Berlin Zoological Garden',
  id: '10'
 }, {
  name: 'Treptower Park',
  lat: 52.488460,
  lng: 13.469744,
  title: 'Treptower Park',
  id: '11'
 }, {
  name: 'German Museum of Technology',
  lat: 52.498698,
  lng: 13.377885,
  title: 'German Museum of Technology',
  id: '12'
 }, {
  name: 'Café Einstein ',
  lat: 52.502056,
  lng: 13.354689,
  title: 'Café Einstein ',
  id: '13'
 }, ];




 $.ajax({
   url: 'https://api.foursquare.com/v2/venues/search?near=Berlin&oauth_token=013LCVBBMA5WRES5WYKVD0GCCGHKKFOEX2PLQEB5O0A440LJ&v=20170703',
   type: 'GET',
   dataType: 'json',
   success: function(data) {
for (var i = 0; i < data.response.venues.length; i++) {
    places.push({
     name: data.response.venues[i].name,
     lat: data.response.venues[i].location.lat,
     lng: data.response.venues[i].location.lng,
     title: data.response.venues[i].name,
     id: data.response.venues[i].id
    });
   }
   },error: function(err) {
      alert("We are having problem please try again");
   }
  });