const RadioStream = require('./lib/stream/radio');
const MediaSourceYoutube = require('./lib/mediasource/youtube');
const Playlist = require('./lib/playlist/playlist');
const PlaylistItem = require('./lib/playlist/item');
const Client = require('./lib/client/client');
const TransportSpeaker = require('./lib/transport/speaker');
const TransportExpress = require('./lib/transport/express');

class Ultritium {
  constructor() {

  }

  Stream(type, playlist) {
    const stream = new RadioStream(playlist);

    return stream;
  }

  Mediasource(type) {
    const mediasource = new MediaSourceYoutube();

    return mediasource;
  }

  Playlist(name) {
    const playlist = new Playlist(name);

    return playlist;
  }

  PlaylistItem(meta) {
    const item = new PlaylistItem(meta);

    return item;
  }

  Client(transport) {
    const client = new Client(transport);

    return client;
  }

  Transport(type, destination) {
    const transports = {
      speaker: TransportSpeaker,
      express: TransportExpress
    };
    
    const transport = new transports[type](destination);

    return transport;
  }
}

module.exports = new Ultritium();
