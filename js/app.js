'use strict';

/**
 * @description Performs an asynchronous ajax request to Wikipedia, requesting
 * articles regarding the given location. Writes the article name and description
 * to the container referenced by the container parameter.
 * @param {string} location - location name
 * @param {string} container - formatted container name to be used by jQuery
 */
function searchWikiPage(location, infoWindow) {
    var wikiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&"
            + "search=" + location + "&format=json&callback=wikiCallBack";

    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        timeout: 10000, // 10 seconds
        success: function(data) {
            if (data.length < 3) {
                // This might not be necessary at all
                infoWindow.setContent("Data from Wikipedia not available");
            }
            else {
                var articleStr = data[1][0];
                var description = data[2][0];

                var finalUrl = "http://en.wikipedia.org/wiki/" + articleStr;

                infoWindow.setContent("<b>From Wikipedia</b>: " + description + "<br><br>"
                    + "<a href='" + finalUrl + "' target='_blank'>Link</a>");
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            infoWindow.setContent("Wikipedia returned an error: " + textStatus);
        }
    });
}

var errorText = ko.observable("");

function mapErrorHandler() {
    errorText("Error: Google Maps could not be loaded");
};

var markers = [];

var Location = function(data) {
    this.name = data.name;
    this.display = ko.observable(true);
};

var ViewModel = function() {
    var self = this;

    this.locationList = ko.observableArray([]);

    locations.forEach(function(location) {
        self.locationList.push(new Location(location));
    })

    /**
     * @description - Selects a single marker based on the given location data
     * @param {string} location - location to search for in markers
     */
    this.selectLocation = function(location) {
        // Find marker based on location and trigger click event
        for (var marker of markers) {
            if (marker.title == location.name) {
                google.maps.event.trigger(marker, 'click');
            }
        }
    };

    self.inputText = ko.observable("");

    /**
     * @description - Filters the location list based on the input string
     */
    this.filterLocations = function() {
        // Convert the search string to lowercase
        var value = self.inputText();

        // Iterate through all locations and compare their names as lowercase
        // to the lowercase value.
        self.locationList().forEach(function(location) {
            var found = location.name.toLowerCase().indexOf(value) != -1;

            location.display(found);

            // Show or hide the corresponding marker
            for (var marker of markers) {
                if (marker.title == location.name) {
                    marker.setMap(found ? map : null);
                    break;
                }
            }
        })
    };
};

var VM = new ViewModel();
ko.applyBindings(VM);

// Bind the inputText changes to a function
VM.inputText.subscribe(function() {
    VM.filterLocations();
});