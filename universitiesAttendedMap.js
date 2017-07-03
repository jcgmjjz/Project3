function initMap() {

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: {lat: 41.70177, lng: -85.92088}
  });

  // Create an array of alphabetical characters used to label the markers.
  var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';


  // creates a single marker with drop animation
  function createOneMarker(location, i){
    var marker = new google.maps.Marker({ 
      position: location,
      label: labels[i % labels.length],
      animation: google.maps.Animation.DROP
    });
    return(marker);
  }

  // creates a single infoWindow
  function createOneInfoWindow(oneContent){
    var infoWindow = new google.maps.InfoWindow({ content: oneContent});
    return(infoWindow);
  }

  // The map method goes through the array locations one index at a time and calls createOneMarker
  // for each index. Each marker is stored in the array markers.
  //alert('crewating markers');
  var markers = locations.map(createOneMarker);

  // The map method goes through the array contentStrings one index at a time and calls createOneInfoWindow
  // for each index. Each infoWindow is stored in the array infoWindows.
  // The infoWindow at index 0 of the array infoWindows matches the marker at index 0 of the array markers.
  //alert('creating infoWindows');
  var infoWindows =  contentStrings.map(createOneInfoWindow);

  // The function generateListenerCallback generates (returns) a callback function
  // to be used for a click listener for an infoWindow marker pair.
  function generateListenerCallback( j ) {
    return function() {
      infoWindows[j].open(map, markers[j]);
    };
  }

  // Go through all of the markers created and add their listener that will
  // create the infoWindow when the marker is clicked.
  //alert('adding listerners');
  for(var j = 0; j<5; ++j){
    markers[j].addListener('click', generateListenerCallback( j ));
  }

  // Add a marker clusterer to manage the markers.
  //alert('clusterer');
  var markerCluster = new MarkerClusterer(map, markers,
      {imagePath: 'imag/m'});

}

// school GPS locations
var locations = [
  {lat: 42.414086, lng: -83.137886},      // University of Detroit Mercy
  {lat: 41.778403, lng: -88.096764},      // Benedictine University
  {lat: 40.101992, lng: -88.227156},      // University of Illinois Urbana-Champaign
  {lat: 41.834928, lng: -87.627042},      // Illinois Institute of Technology
  {lat: 41.924381, lng: -87.654856}       // DePaul University
]

// Strings used for each marker infoWindow.
var contentStrings= [
  '<div class="university" id="udm">' + '<h1>University of Detroit Mercy</h1>' +
  '<p>4001 W. McNichols Rd</p>' + '<p>Detroit Mi 48221</p>' +
  '<p>Degree Received: Bachelor of Electrical Engineering</p>' +
  '</div>',
  '<div class="university" id="bu">' + '<h1>Benedictine University</h1>' +
  '<p>5700 College Rd</>' + '<p>Lisle IL 60532</p>' +
  '<p>Degree Received: None</p>' + '</div>',
  '<div class="university" id="uiuc">' + '<h1>University of Illinois Urbana-Champaign</h1>' +
  '<p>901 West Illinois Str.</p>' + '<p>Urbana IL 61801</p>' +
  '<p>Degree Received: Master of Science in Electrical Engineering</p>' + '</div>',
  '<div class="university" id="iit">' + '<h1>Illinois Institute of Technology</h1>' +
  '<p>3300 S Federal St.</p>' + '<p>Chicago IL 60616</p>' +
  '<p>Degree Received: None</p>' + '</div>',
  '<div class="university" id="du">' + '<h1>DePaul University</h1>' +
  '<p>2320 N Kenmore Ave.</p>' + '<p>Chicago IL 60614</p>' +
  '<p>Degree Received: None</p>' + '</div>'
]

google.maps.event.addDomListener(window, 'load', init);
