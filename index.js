const WebSocket = require('ws');
var DDPClient = require('ddp-client');

var ddpclient = new DDPClient({
  // All properties optional, defaults shown
  host: 'localhost',
  port: 3000,
  ssl: false,
  autoReconnect: true,
  autoReconnectTimer: 500,
  maintainCollections: true,
  socketContructor: WebSocket,
  ddpVersion: '1' // ['1', 'pre2', 'pre1'] available
});

/*
 * Connect to the Meteor Server
 */
ddpclient.connect(function(error, wasReconnect) {
  // If autoReconnect is true, this callback will be invoked each time
  // a server connection is re-established
  if (error) {
    console.log('DDP connection error!', error);
    return;
  }

  if (wasReconnect) {
    console.log('Reestablishment of a connection.');
  }

  console.log('connected!');

  setTimeout(
    function() {
      /*
     * Call a Meteor Method
     */
      console.log('calling...', new Date());
      ddpclient.call('test.respond', [500], function(err, result) {
        // name of Meteor Method being called // parameters to send to Meteor Method
        // callback which returns the method call results
        console.log('called function, result: ' + result);
        console.log(new Date());
      });
    },
    3000
  );
});
