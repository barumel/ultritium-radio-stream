// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

const RadioStream = require('../../index');
const MediaSource = RadioStream.MediaSource('youtube');
const MultiStream = require('multistream');
const lame = require('lame');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8014;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/stream', function(req, res) {
  const dings = [{
    source: 'youtube',
    uri: 'https://www.youtube.com/watch?v=j1FwlQhFLQQ',
    duration: 188000
  }, {
    source: 'youtube',
    uri: 'https://www.youtube.com/watch?v=Ayt7gBA38og',
    duration: 210000
  }, {
    source: 'youtube',
    uri: 'https://www.youtube.com/watch?v=1weknlCoHmw',
    duration: 199000
  }];

  res.set({'Content-Type': 'audio/mpeg'});
  res.set({'Access-Control-Allow-Origin': '*'});
  res.set({'Content-Encoding': 'identity'});

  const streams = [MediaSource.get(dings[0]), () => {
    return MediaSource.get(dings[1])
  }, () => {
    return MediaSource.get(dings[2])
  }];

  const decoder = lame.Decoder();
  const encoder = new lame.Encoder({channels: 2, bitDepth: 16, sampleRate: 44100});

  MultiStream(streams).pipe(decoder).pipe(encoder).pipe(res);
});

router.get('/v2/stream', (req, res) => {
  const dings = [{
    source: 'youtube',
    uri: 'https://www.youtube.com/watch?v=j1FwlQhFLQQ',
    duration: 188000
  }, {
    source: 'youtube',
    uri: 'https://www.youtube.com/watch?v=Ayt7gBA38og',
    duration: 210000
  }, {
    source: 'youtube',
    uri: 'https://www.youtube.com/watch?v=1weknlCoHmw',
    duration: 199000
  }];

  res.set({'Content-Type': 'audio/mpeg'});
  res.set({'Access-Control-Allow-Origin': '*'});
  res.set({'Content-Encoding': 'identity'});

  const playlist = RadioStream.Playlist({name: 'Test'}, {repeat: true});
  dings.forEach(ding => playlist.add(RadioStream.PlaylistItem(ding)));

  const decoder = lame.Decoder();
  const encoder = new lame.Encoder({channels: 2, bitDepth: 16, sampleRate: 44100});
  const stream = RadioStream.MediaStream(playlist, decoder, encoder);
  const client = RadioStream.Client(res);

  stream.registerMediaSource(RadioStream.MediaSource('youtube'));
  stream.registerClient(client);

  stream.start();
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
