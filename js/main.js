 var map;
 var markers = [];
 ko.bindingHandlers.map = {
     init: function() {
         map = new google.maps.Map(document.getElementById('map'), {
             center: {
                 lat: 52.52000046,
                 lng: 13.40999985
             },
             zoom: 13
         });
     }
 };
 // Create the marker and the infoWindow,
 function CreateMarker(lat, lng, title, infoContent, image) {
     var icon = 'https://i.imgur.com/lmNYKw1.png';
     if (markers.length >= places.length) {
         console.log('Already Exist');
     } else {
         var m = {
             lat: lat,
             lng: lng
         };
         var marker = new google.maps.Marker({
             position: m,
             title: title,
             animation: google.maps.Animation.DROP,
             icon: icon
         });
         markers.push(marker);
     }
 }

 function CreateInfo(data) {
     // infowindow opens when clicked!
     // search for marker
     for (var i = 0; i < markers.length; i++) {
         if (data.title == markers[i].title) {
             infowindow = new google.maps.InfoWindow({
                 content: "<h1>" + data.name + "</h1>" + "<p>" + data.info + "</p>" + "<img src='" + data.photo + "' alt='Place Image' class='infoImage' />"
             });
             map.setCenter({
                 lat: data.lat,
                 lng: data.lng
             });
             map.setZoom(16);
             infowindow.open(map, markers[i]);
         }
     }
 }

 // Wikipedia API
 function getWiki(value) {
     var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + value + "&limit=1&format=json";
     if (value) {
         $.ajax({
                 url: url,
                 type: 'GET',
                 dataType: 'jsonp'
             })
             .done(function(response) {
                 $('.wiki').html("<h1>" + response[0] + "</h1>" + "<p class='wikitext'>" + response[2] + ".</p>" + "<a  target='_blank' href='" + response[3] + "' class='readmore'>ReadMore</a>");
                 $('.wiki').animate({
                     opacity: 0.8
                 }, 400);
                 $('.wiki').click(function(event) {
                     $('.wiki').animate({
                         opacity: 0
                     }, 500);
                 });
             })
             .fail(function() {
                 console.log("error");
                 alert('error while parsing your request. ');
             });
     } else {
         alert("Sorry its looks like the place has no wikipedia page ! ");
     }
 }

 function showMarkers() {
     for (var i = 0; i < places.length; i++) {
         CreateMarker(places[i].lat, places[i].lng, places[i].title, places[i].info, places[i].photo);
         markers[i].setMap(map);
     }
 }

 // MOdelView
 var vm = function() {
    self = this
    this.weatherIcon =  ko.observable();
    this.weatherStat =  ko.observable();
    this.query = ko.observable('');
     // Getting the Weather
    this.showTodayWeather = ko.computed(function(){
         var url = "http://api.wunderground.com/api/8b2bf4a9a6f86794/conditions/q/Germany/berlin.json";
         $.ajax({
             url: url,
             type: 'GET',
             dataType: 'json'
         }).done(function(response) {
             // On Success
               self.weatherIcon(response.current_observation.icon_url);
               self.weatherStat(response.current_observation.dewpoint_c +" C - "+ response.current_observation.weather);
         }).fail(function(err) {
             // on error
             console.log("error" + err);
             alert('Weather Unavialable');
         });
     },this),
    this.showAllAtStart = ko.computed(function(){
        showMarkers();
    }, this);
    this.toggle = function() {
             // toggle the menu
             $('.options').toggleClass('open');
         },
    this.show = function(){
            showMarkers();
         },
             // Show all the markers or the plces of tourist attractions
    this.setZoom = function() {
             // zoom out for the mobile version
             map.setZoom(12);
         },
    this.showThis = function(data, response) {
         // For every item in the markers
         // Getting data from wikipedia
         getWiki(data.name);
         // Checking if the info is already open
         //  // close it
         if (self.infowindow) {
             self.infowindow.close();
         }
         // Creating the InfoWindow
         CreateInfo(data);
         // Show the markers only when the item is clicked
         for (var i = 0; i < markers.length; i++) {
             if (data.title == markers[i].title) {
                 markers[i].setMap(map);
                 map.setCenter({
                     lat: data.lat,
                     lng: data.lng
                 });
             } else {
                 // else clear the markers
                 markers[i].setMap(null);
             }
         }
         },
    this.showCoffe = function() {
         console.log("Coffe");
         var cafePlcae = places[12];
         if (self.infowindow) {
             self.infowindow.close();
         }
         CreateInfo(cafePlcae);
         map.setCenter({
             lat: cafePlcae.lat,
             lng: cafePlcae.lng
         });
         map.setZoom(16);

     };
 };

 ko.applyBindings(vm);