var withinRange = require(__dirname + '/helpers/index.js').withinRange;

var target = {
  lat: 34.019297,
  long: -118.494686
}

var myLocation = {
  lat: 34.019295,
  long: -118.494610
}

var meters = [1, 5, 10, 15, 20, 25, 30, 35];
for (var i=0; i<meters.length; i++) {
  console.log("Does it work with",meters[i],"meters?", withinRange(target.lat,target.long,myLocation.lat,myLocation.long, meters[i]))
}
