var locations = [
    {
        name: "Geylang Serai Market",
        id: "ChIJ9YySoRAY2jERp62zayDnKuM",
        location: {lat: 1.316728, lng: 103.898277}
    },
    {
        name: "Long Phung",
        id: "ChIJqTY_gxEY2jERYmK8LIyivgo",
        location: {lat: 1.312713, lng: 103.900143}
    },
    {
        name: "Little Vietnam",
        id: "ChIJPbH-KxYY2jERWtR5TBtZ-DU",
        location: {lat: 1.314085, lng: 103.891805}
    },
    {
        name: "Fei Fei Wanton Noodle",
        id: "ChIJbf1bwhEY2jER4T3aaybaPcM",
        location: {lat: 1.313522, lng: 103.90227}
    },
    {
        name: "VeganBurg Singapore",
        id: "ChIJTY2khwQY2jERlMZdzuX1VfA",
        location: {lat: 1.320948, lng: 103.905471}
    }
];

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

    this.selectLocation = function(location) {
        // Find marker based on location and trigger click event
        for (var marker of markers) {
            if (marker.title == location.name()) {
                google.maps.event.trigger(marker, 'click');
            }
        }
    };

    this.filterLocations = function(data, event) {
        var value = event.target.value;

        //console.log(value);
        //console.log(self.locationList());

        self.locationList().forEach(function(location) {
            if (location.name().includes(value)) {
                //console.log("found! " + location.name());
                location.display(true);
            }
            else {
                location.display(false);
            }
        })

        // Search for value in location list
        //for (var location of locations) {
        //    if (location.name.includes(value)) {
                //candidates.push(location);
                //self.locationList().push
        //    }
        //}
    };
};

ko.applyBindings(new ViewModel());