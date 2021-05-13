const GEOJSON_PATH = 'assets/geojson/location.geojson'
const IMG_FOLDER = "assets/images/"

let serviceIcon = L.icon({
    iconUrl: 'assets/geojson/placeholder.png',
    iconSize: [25, 25],
    shadowSize: [0, 0],
    iconAnchor: [10, 10],
    shadowAnchor: [0, 0],
    popupAnchor: [-10, -10]
});

let file = $.ajax({
    url: GEOJSON_PATH,
    dataType: "json",
    success: console.log("County data successfully loaded."),
    error: function (xhr) {
        alert(xhr.statusText)
    }
})

$.when(file).done(function () {
    let layer = file.responseJSON
    function onEachFeature(feature, layer) {
        layer.on('mouseover', function (e) {
            let container = document.getElementById('abscard')
            container.innerHTML =
             `
            <div id="card-row" class="row">
                <div class="col-sm">
                   <p><i class="bi bi-geo-alt-fill"></i></p>
                   <h3 style="font-weight:bold;">
                    ${feature.properties.Address}
                    </h3>
                </div>
                <div class="col-sm">
                    <p><i class="bi bi-compass"></i></p>
                    <h3 id="coor" style="font-weight:bold;">
                    ${feature.geometry.coordinates} 
                    </h3>
                </div>
            </div>
            <img class="responsive-iframe" frameborder="0" scrolling="no" src="${IMG_FOLDER + feature.properties.img_loc}"></img>
            <p class="caption">Description: ${feature.properties.description}</p>
            `
        });
    }


    let layers = L.geoJSON(layer, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
            let marker = L.marker(latlng, {
                icon: serviceIcon
            });
            return marker;
        }
    }).addTo(map)

    
})
