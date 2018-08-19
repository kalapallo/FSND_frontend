var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 1.355379, lng: 103.867744},
        zoom: 12
    });

    var infoWindow = new google.maps.InfoWindow();
    var infoWindowContent = document.getElementById('infowindow-content');
    infoWindow.setContent(infoWindowContent);

    for (var val of locations) {
        var marker = new google.maps.Marker({
            map: map,
            position: val.location,
            title: val.name,
            icon: "redmarker2.png"
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
            createInfoWindow(this, infoWindow);
        })
    }
}

function createInfoWindow(marker, infoWindow) {
    if (infoWindow.marker != marker) {
        infoWindow.marker = marker;
        // Create the HTML for this infowindow
        var nameHTML = '<div><u><b>' + marker.title + '</b></u></div>';
        var wikiHTML = '<div id="wiki-test">Loading info from Wikipedia...</div>';
        infoWindow.setContent(nameHTML + wikiHTML);
        infoWindow.setOptions({maxWidth: 200});

        infoWindow.open(map, marker);

        // Load wiki link asynchronously in 'wiki-test' container
        searchWikiPage(marker.title, "#wiki-test");

        // Set the icon back to red and set infoWindow's marker to null when closing
        infoWindow.addListener('closeclick',function(){
            marker.setIcon("redmarker2.png");
            infoWindow.marker = null;
        });
    }
}