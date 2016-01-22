var math = require('mathjs');

var haversine = function(lat1, long1, lat2, long2){

  var dlat = toRadians(lat1 - lat2);
  var dlong = toRadians(long1 - long2);

  var angle = math.pow(math.sin(dlat/2),2) + math.cos(lat1) * math.cos(lat2) * math.pow(math.sin(dlong/2),2);
  // if (angle < 0) {
  //   throw "Angle is too small" + angle;
  //   // console.log("Angle is too small", angle);
  //   // return false
  // } else {
  console.log("What's the angle", angle);
  var circle = 2 * math.atan2(math.sqrt(angle), math.sqrt(1-angle));
  var distance = 6367000 * circle;
  return distance;
  // }
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
