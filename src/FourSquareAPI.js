//Code from https://de.foursquare.com/developers/apps
const request = require('request');

//URL https://api.foursquare.com/v2/venues/search?ll=53.350140, -6.266155&query="pub"&client_id=D0GQP4NDGYESWGEPP3YVRJQJIUGWP35KBKYAU2T1TYE0IVMA&client_secret=YFKNTG1WLS5PLNOYRI34OJFWWYLFE5I1IMICAJFHNUXIP4XM&v=20180802
request({
  url: 'https://api.foursquare.com/v2/venues/search',
  method: 'GET',
  qs: {
    client_id: 'D0GQP4NDGYESWGEPP3YVRJQJIUGWP35KBKYAU2T1TYE0IVMA',
    client_secret: 'YFKNTG1WLS5PLNOYRI34OJFWWYLFE5I1IMICAJFHNUXIP4XM',
    ll: '40.7243,-74.0018',
    query: 'pubs',
    v: '20180323',
    limit: 1
  }
}, function(err, res, body) {
  if (err) {
    console.error(err);
  } else {
    console.log(body);
  }
});