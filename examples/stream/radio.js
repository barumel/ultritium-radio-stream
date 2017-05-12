const decoder = require('lame').Decoder;

const MediaSourceYoutube = require('../../lib/mediasource/youtube');
const TransportSpeaker = require('../../lib/transport/speaker');
const Client = require('../../lib/client/client');
const MediaStreamRadio = require('../../lib/stream/radio');
const Playlist = require('../../lib/playlist/playlist');
const PlaylistItem = require('../../lib/playlist/item');


// Create a new mediasource instance
const mediasource = new MediaSourceYoutube();
const transport = new TransportSpeaker();
const playlist = new Playlist('Super Awesom Playlist');

const meta = {
  id: 1,
  source: 'youtube',
  uri: 'https://www.youtube.com/watch?v=WrrJSKqL1oA',
  duration: 30000
};

const meta2 = {
  id: 2,
  source: 'youtube',
  uri: 'https://www.youtube.com/watch?v=j1FwlQhFLQQ',
  duration: 188000
};

const item = new PlaylistItem(meta);
const item2 = new PlaylistItem(meta2);
playlist.add(item);

const client = new Client(transport);

const stream = new MediaStreamRadio(playlist);
stream.addMediasource('youtube', mediasource);
stream.registerClient(client);

//console.log(stream);

stream.start();




//const stream = mediasource.get(meta).pipe(decoder());

//client.send(stream);
