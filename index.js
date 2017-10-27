const MediaStream = require('./lib/stream/MediaStream');
const MediaSourceYoutube = require('./lib/mediasource/Youtube');
const Playlist = require('./lib/playlist/Playlist');
const PlaylistItem = require('./lib/playlist/Item');
const Client = require('./lib/client/Client');
const lame = require('lame');

class Ultritium {
  constructor() {

  }

  Stream(type, playlist) {
    const stream = new MediaStream(playlist);

    return stream;
  }

  MediaStream(playlist, decoder, encoder) {
    const stream = new MediaStream(playlist, decoder, encoder);

    return stream;
  }

  MediaSource(type) {
    const mediasource = new MediaSourceYoutube();

    return mediasource;
  }

  Playlist(data, items) {
    const playlist = new Playlist(data, items);

    return playlist;
  }

  PlaylistItem(meta) {
    const item = new PlaylistItem(meta);

    return item;
  }

  Client(target) {
    const client = new Client(target);

    return client;
  }

  Decoder() {
    return lame.Decoder();
  }

  Encoder() {
    return new lame.Encoder({channels: 2, bitDepth: 16, sampleRate: 44100});
  }
}

module.exports = new Ultritium();
