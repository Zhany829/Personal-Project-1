mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10', // stylesheet location
    center: ground.geometry.coordinates, // starting position [lng, lat]
    zoom: 10 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());


new mapboxgl.Marker()
    .setLngLat(ground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${ground.title}</h3><p>${ground.location}</p>`
            )
    )
    .addTo(map)

