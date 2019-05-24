// Create the createMap function
function createMap(PastWeekEarthquakes){

  // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data & copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light"
    accessToken: API_KEY
  });
  
// Initialize all of the LayerGroups we'll be using for the earthquakes
var layers = {
    MAG: new L.LayerGroup(),
    PLACE: new L.LayerGroup(),
    TIME: new L.LayerGroup(),
  };
  
  // Create the map with our layers
  var map = L.map("map-id", {
    center: [39.8283, -98.5795],
    zoom: 12,
    layers: [
      layers.MAG,
      layers.PLACE,
      layers.TIME,
    ]
  });

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap
  };

  // Create an overlayMaps object to hold the USGS layer
  var overlayMaps = {
    "Earthquakes": PastWeekEarthquakes
  };

  // Create the map object with options
  var map = L.map("map-id", {
    center: [39.8283, -98.5795],
    zoom: 5,
    layers: [lightmap, PastWeekEarthquakes]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

// Initialize an object containing circles for each layer group
var circles = {
  "0-1": L."0-1".circleMarkers({
    radius: (type == "Earthquakes"), 
    color: "white",
    stroke: "green",
  }),
  "1-2": "1-2".circleMarkers({
    radius: (type == "Earthquakes"),
    color: "white",
    stroke: "yellow",
  }),
  "2-3": "2-3".circleMarkers({
    radius: (type == "Earthquakes"),
    color: "white",
    stroke: "#FF906A"
  }),
  "3-4": "3-4".circleMarkers({
    radius: (type == "Earthquakes"), 
    color: "white",
    stroke: "orange",
  }),
  "4-5": L."4-5".circleMarkers({
    radius: (type == "Earthquakes"),
    color: "white",
    stroke: "red",
  })
};

// Create the createMarkers function
function createMarkers(response) {

  // Pull the "earthquakes" property off of response.data
  var earthquakes = response.data.properties;

  // Initialize an array to hold earthquake magnitude
  var earthquakeMarkers = [];

  // Loop through the stations array
  for (var index = 0; index < earthquakes.length; index++) {
    var earthquake = earthquakes[index];

    // For each earthquake, create a marker and bind a popup with the earthquakes's coordinates
    var earthquakeMarkers = L.marker([earthquake.lat, earthquake.lon])
      .bindPopup("<h3>" + earthquake.name + "<h3><h3>Capacity: " + earthquake.capacity + "<h3>");

    // Add the marker to the earthquake magnitude array
      earthquakeMarkers.push(earthquakeMarkers);
    }
  // Create a layer group made from the earthquake markers array, pass it into the createMap function
  createMap(L.layerGroup(earthquakeMarkers));
}

// Perform an API call to the USGS API to get earthquake information. Call earthquakeMarkers when complete
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", earthquakeMarkers);