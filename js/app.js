var list = [
    {
        name: "Geylang Serai Market",
        id: "ChIJ9YySoRAY2jERp62zayDnKuM"
    },
    {
        name: "Long Phung",
        id: "ChIJqTY_gxEY2jERYmK8LIyivgo"
    },
    {
        name: "Little Vietnam",
        id: "ChIJPbH-KxYY2jERWtR5TBtZ-DU"
    },
    {
        name: "Carpmael Park",
        id: "ChIJWwnRwxMY2jERYUe9ex2yBMw"
    },
    {
        name: "Tanjong Katong Complex",
        id: "ChIJB5iUeRcY2jERTV7fJij_i4A"
    }
]

var Location = function(data) {
    this.name = ko.observable(data.name);
    this.id = ko.observable(data.id);
};

var ViewModel = function() {
    var self = this;

    this.locationList = ko.observableArray([]);

    list.forEach(function(location) {
        self.locationList.push(new Location(location));
        //console.log("added: " + location.name);
    })

    // NOTE: clicking on items must be handled by knockout
    this.selectLocation = function(location) {
        alert("selected " + "'" + location.name() + "'");
    };
};

ko.applyBindings(new ViewModel());