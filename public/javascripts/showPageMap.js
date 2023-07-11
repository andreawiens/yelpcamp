mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v11', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 8, // starting zoom
});
map.addControl(new mapboxgl.NavigationControl());

// create the popup
const popup = new mapboxgl.Popup({ offset: 25 })
    .setHTML(`<h3>${campground.title}</h3><p>${campground.location}</p>`);

// create the marker
new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(popup) // sets a popup on this marker
    .addTo(map);