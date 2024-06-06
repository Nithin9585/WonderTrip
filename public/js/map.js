mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: "mapbox://styles/mapbox/dark-v11", // Use the dark style
    center: coordinates, // Starting position [lng, lat]
    zoom: 9 // Starting zoom
  });
  

const marker = new mapboxgl.Marker({color : "red"})
.setLngLat(coordinates)
.setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML("<b>Exact location provided after booking    </b>")
)
.addTo(map)

  
