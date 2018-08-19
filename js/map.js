var map;

function initMap() {
    console.log("initializing...");

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 1.355379, lng: 103.867744},
        zoom: 12
    });

    console.log(map);

    var input = document.getElementById('loc-search');
    //var options = {
    //    bounds: defaultBounds,
    //    types: ['establishment']
    //};

    //var autocomplete = new google.maps.places.Autocomplete(input); //, options);
    //autocomplete.bindTo('bounds', map);

    var infoWindow = new google.maps.InfoWindow();
    var infoWindowContent = document.getElementById('infowindow-content');
    infoWindow.setContent(infoWindowContent);

    for (var val of locations) {
        var marker = new google.maps.Marker({
            map: map,
            position: val.location,
            title: val.name,
            icon: "redmarker2.png"
            //animation: google.maps.Animation.DROP,
            //id: i
        });

        markers.push(marker);
        marker.addListener('click', function() {
            // Reset all other markers to previous icon
            for (var m of markers) {
                m.setIcon("redmarker2.png");
            }
            // Highlight the clicked marker
            this.setIcon("bluemarker2.png");
            // Create infowindow
            populateInfoWindow(this, infoWindow);
        })
    }

    // THIS IS ACTUALLY WORKING
    //var service = new google.maps.places.PlacesService(map);
    //var infoWindow = new google.maps.InfoWindow();
    //var infoWindowContent = document.getElementById('infowindow-content');
    //infoWindow.setContent(infoWindowContent);


    // TEMP TEST
    /*
    service.getDetails({
        placeId: 'ChIJ9YySoRAY2jERp62zayDnKuM'
    }, function(place, status) {
        console.log(place);

        if (status === google.maps.places.PlacesServiceStatus.OK) {
            console.log("DEBUG: okoo");
            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location
            });
            google.maps.event.addListener(marker, 'click', function() {
                infoWindow.setContent('<div><strong>' + place.name + '</strong><br>'
                    + 'Place ID: ' + place.place_id + '<br>'
                    + place.formatted_address + '</div>');
                infoWindow.open(map, this);
            });
        }
    });
    */

    console.log("init done");
}

function populateInfoWindow(marker, infoWindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infoWindow.marker != marker) {
        infoWindow.marker = marker;
        var nameHTML = '<div><u><b>' + marker.title + '</b></u></div>';
        var wikiHTML = '<div id="wiki-test">Loading info from Wikipedia...</div>';
        infoWindow.setContent(nameHTML + wikiHTML);
        infoWindow.setOptions({maxWidth: 200});

        infoWindow.open(map, marker);

        // Load wiki link asynchronously in 'wiki-test' container
        // TODO: cache the data so no need to load the info every time
        searchWikiPage(marker.title, "#wiki-test");

        // Set the icon back to red and set infoWindow's marker to null when closing
        infoWindow.addListener('closeclick',function(){
            marker.setIcon("redmarker.png");
            infoWindow.marker = null;
        });
    }
}