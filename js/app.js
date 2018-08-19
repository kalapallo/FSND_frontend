var locations = [
    {
        name: "Plaza Singapura",
        location: {lat: 1.3005659, lng: 103.8448524}
    },
    {
        name: "Marina Bay Sands",
        location: {lat: 1.2833754, lng: 103.8607264}
    },
    {
        name: "National Museum of Singapore",
        location: {lat: 1.2966147, lng: 103.8485095}
    },
    {
        name: "Lau Pa Sat",
        location: {lat: 1.280684, lng: 103.8504436}
    },
    {
        name: "Raffles Hotel",
        location: {lat: 1.2948829, lng: 103.8544791}
    }
];

/**
 * @description Performs an asynchronous ajax request to Wikipedia, requesting
 * articles regarding the given location. Writes the article name and description
 * to the container referenced by the container parameter.
 * @param {string} location - location name
 * @param {string} container - formatted container name to be used by jQuery
 */
function searchWikiPage(location, container) {
    var wikiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&"
            + "search=" + location + "&format=json&callback=wikiCallBack";

    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        timeout: 10000, // 10 seconds
        success: function(data) {
            var $temp = $(container);

            if (data.length < 3) {
                // This might not be necessary at all
                $temp.html('Data from Wikipedia not available');
            }
            else {
                var articleStr = data[1][0];
                var description = data[2][0];

                var finalUrl = "http://en.wikipedia.org/wiki/" + articleStr;

                $temp.html('<b>From Wikipedia</b>: ' + description + '<br><br>'
                    + '<a href="' + finalUrl + '" target="_blank">Link</a>')
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var $temp = $(container);
            $temp.html('Wikipedia returned an error: ' + textStatus);
        }
    });
}

var markers = [];

var Location = function(data) {
    this.name = ko.observable(data.name);
    this.id = ko.observable(data.id);
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
            if (marker.title == location.name()) {
                google.maps.event.trigger(marker, 'click');
            }
        }
    };

    /**
     * @description - Filters the location list based on the input string
     * @param {Object} data - Not used
     * @param {Object} event - Event information from the parent control
     */
    this.filterLocations = function(data, event) {
        // Convert the search string to lowercase
        var value = event.target.value.toLowerCase();

        // Iterate through all locations and compare their names as lowercase
        // to the lowercase value.
        self.locationList().forEach(function(location) {
            var found = location.name().toLowerCase().indexOf(value) != -1;

            location.display(found);

            // Show or hide the corresponding marker
            for (var marker of markers) {
                if (marker.title == location.name()) {
                    marker.setMap(found ? map : null);
                    break;
                }
            }
        })
    };
};

ko.applyBindings(new ViewModel());