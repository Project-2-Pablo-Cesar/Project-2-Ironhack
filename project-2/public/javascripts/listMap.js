document.addEventListener('DOMContentLoaded', () => {

    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
    });
    geolocalize().then(center => {
      map.setCenter(center);
  
      services.forEach(rest => {
        new google.maps.Marker({
          position: {
            lat:services.location.coordinates[0],
            lng:services.location.coordinates[1]
          },
          map: map,
          title: rest.name
        });
      })
  
    });
    
  
    }, false);