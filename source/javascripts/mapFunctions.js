$(document).ready(function() {
  
    

    // Plug geocoding on every .geocodeForm form
    $('.geocodeForm').submit(function(){
        
        var mapHelper = new styledMapsHelper();
        
        var form = $(this);
        var mapElementId = form.attr('rel');
        var map = $('#' + mapElementId).data('map');
        var address = form.find('.geocodeInput').val();
        mapHelper.geocode(address, map);
        
        return false; 
    });

});


// A helper class to create styled maps

function styledMapsHelper() {
    
    
    
    
}

// Function to create a map with specific style, a div container, default position and custom zoom
styledMapsHelper.prototype.createStyledMap = function(element, position, styleArray, customZoom) {
    var map = this.createGoogleMap(element, position);
    this.setMapStyle(map, styleArray);
    if (customZoom) {
        this.setCustomControls(map);
    }
    return map;
}
    
    
// Helper to create a Google Map in a div at specific location (either "human readable address" or lat/lng
styledMapsHelper.prototype.createGoogleMap = function(element, position) {
    // Extract the DOM element from the jQuery object
    var domElement = element[0];
        
    // Set options and create the map
    var myOptions = {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControl: false,
        scrollwheel:false
    };
    var map = new google.maps.Map(domElement, myOptions);
    
    // Define default center and zoom
    // If the position variable is an array it must be [latitude, longitude, zoom]
    // If this is a string, this string will be geocoded and the center and zoom will defined accordingly
    if (jQuery.isArray(position)) {
        // It is an arrat like [latitude, longitude, zoom]
        latlng = new google.maps.LatLng(position[0],position[1]);
        map.setCenter(latlng);
        map.setZoom(position[2]);
    } else {  
        this.geocode(position, map);
    }
    
    element.data('map', map);
    return map;
}
    
    
// Just add custom style to a map object
styledMapsHelper.prototype.setMapStyle = function(googleMap, styleArray) {
    googleMap.setOptions({
        styles: styleArray
    });
    
    // Add a custom zoom control. You can style those controles via CSS
    this.setCustomControls = function(map) {
    
        map.setOptions({
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL
            },
            disableDefaultUI: true 
        });
    
        var mapElement = map.getDiv();
        var jMapElement = jQuery(mapElement);
    
        jMapElement.append('<div class="zoomShell"><div class="zoomIn zoom">+</div><div class="zoomOut zoom">-</div></div>');
    
        var zoomIn = jMapElement.find('.zoomIn');
        var zoomOut = jMapElement.find('.zoomOut');
    
        zoomIn.on('click', function(){
            var newZoom = map.getZoom() + 1; 
            map.setZoom(newZoom);  
        });
        zoomOut.on('click', function(){
        
            var newZoom = map.getZoom() - 1; 
            map.setZoom(newZoom);  
        });
    
    }
    
    
}
    
// Transform a human readable addresse into a latitude, longitude and zoom
// Then set the map coordinates with these result
styledMapsHelper.prototype.geocode = function(address, map) {
        
    var geocoder = new google.maps.Geocoder();
        
    geocoder.geocode( {
        'address': address
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            // If we have a result, we set the zoom to the bound of the place
            // eg: France will have a higher zoom than Paris
            map.fitBounds(results[0].geometry.viewport);
        }    
    });
}

