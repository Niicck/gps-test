var math = require('mathjs');

var haversine = function(lat1, long1, lat2, long2){

  lat1 = toRadians(lat1);
  long1 = toRadians(long1);
  lat2 = toRadians(lat2);
  long2 = toRadians(long2);

  var dlat = lat1 - lat2;
  var dlong = long1 - long2;

  var angle = math.pow(math.sin(dlat/2),2) + math.cos(lat1) * math.cos(lat2) * math.pow(math.sin(dlong/2),2);
  var circle = 2 * math.atan2(math.sqrt(angle), math.sqrt(1-angle));
  var distance = 6367000 * circle;
  return distance;
}

var toRadians = function(deg) {
  return deg * Math.PI / 180;
}

exports.withinRange = function(lat1, long1, lat2, long2, m) {
  var dist = haversine(lat1,long1,lat2,long2)
  if (dist) {
    return dist <= m;
  } else {
    return false;
  };
}
feature) create formula to calculate distance from lat/long in meters
