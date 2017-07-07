var map;
var markers = [];
var infowindow;
// The Reason i duplicated the array
// Is i had a bug in my code with filtered data
// Its seems when ever i try to empty the ko.obserableArry
// it delte my original array in file myPlaces
var nemo = [].concat(places);
function start() {
google.maps.event.addDomListener(window, 'load', init);
}
function init() {
        // Initiate the Map
        try{
            infowindow = new google.maps.InfoWindow();
            map = new google.maps.Map(document.getElementById('map'), {
                center: {
                    lat: 52.52000046,
                    lng: 13.40999985
                },
                zoom: 13
            });
         for (var i = 0; i < places.length; i++) {
            // Set the Marker On the map as soon as its load
             CreateMarker(places[i].lat, places[i].lng, places[i].title, places[i].info, places[i].photo);
             // Show the Markers on the map
             markers[i].setMap(map);
         }
    }
    catch(err) {
       // do nothing :)
    }
}

ko.bindingHandlers.map = {
    init: function() {
        init();
    }
};
function startApp(){
    alert();
 ko.applyBindings(viewModel);
}

function mapError() {
    alert("Please Try Again later!");
}
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
        // The Content
        var theTitle = "<h1>" + title + "</h1>";
        var theDesc = "<p>" + infoContent + "</p>";
        var theImg = "<img src='" + image + "' />";
        var TheContent = theTitle + theDesc + theImg;
        // Marker Event Listener
         marker.addListener('click', function() {
            infowindow.setContent(TheContent);
            infowindow.open(map, marker);
        });
        markers.push(marker);
     }
}
var viewModel = function() {
    var self = this;
    // search Query
    this.query = ko.observable();
    // Weather Icon
    this.weatherIcon = ko.observable();
    this.weatherStat = ko.observable();
    this.placest = ko.observableArray(nemo);
    this.menuVis = ko.observable(false);
    // Getting the Weather
    this.showTodayWeather = ko.computed(function() {
            var url = "http://api.wunderground.com/api/8b2bf4a9a6f86794/conditions/q/Germany/berlin.json";
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json'
            }).done(function(response) {
                // On Success
                self.weatherIcon(response.current_observation.icon_url);
                self.weatherStat(response.current_observation.dewpoint_c + " C - " + response.current_observation.weather);
            }).fail(function(err) {
                // on error
                console.log("error" + err);
                alert('Weather Unavialable');
            });
        }, this);
    // on item click show infowinfow
    this.showThis = function(e) {
        for (var i = 0; i < markers.length; i++) {
            if(e.title == markers[i].title) {
                var theTitle = "<h1>" + e.title + "</h1>";
                var theDesc = "<p>" + e.info + "</p>";
                var theImg = "<img src='" + e.photo + "' />";
                var TheContent = theTitle + theDesc + theImg;
                infowindow.setContent(TheContent);
                infowindow.open(map, markers[i]);
            }
        }
        };
    search = function(value) {
        // remove all the current places, which removes them from the view
        self.placest.removeAll();
        for(var x in places) {
          if(places[x].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
            self.placest.push(places[x]);
            markers[x].setVisible(true);
          }else {
            markers[x].setVisible(false);
          }
        }

      },
      this.showMenu = function() {
        if (!this.menuVis()) {
            this.menuVis(true);
        }else {
            this.menuVis(false);
        }
      },
      this.setZoom = function() {
        map.setZoom(12);
      };

this.query.subscribe(this.search);

};

 ko.applyBindings(viewModel);
