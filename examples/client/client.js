const decoder = require('lame').Decoder;

const MediaSourceYoutube = require('../../lib/mediasource/youtube');
const TransportSpeaker = require('../../lib/transport/speaker');
const Client = require('../../lib/client/client');


// Create a new mediasource instance
const mediasource = new MediaSourceYoutube();
const transport = new TransportSpeaker();

const meta = {
  id: 1,
  source: 'youtube',
  uri: 'https://www.youtube.com/watch?v=WrrJSKqL1oA',
  duration: 30000
};


const client = new Client(transport);
const stream = mediasource.get(meta).pipe(decoder());

client.send(stream);
