const EventEmitter = require('events');
const _ = require('lodash');

const Client = require('../client/client');
const Playlist = require('../playlist/playlist');
const MediaSource = require('../mediasource/mediasource');

const ugh = require('lame').Decoder;

class MediaStream extends EventEmitter {
  constructor(playlist, decoder, options = {}) {
    if (!playlist instanceof Playlist) {
      throw new Error('The given playlist is not an instance of Playlist');
    }

    super(options);

    this.playlist = playlist;
    this.decoder = decoder;
    this.clients = [];
    this.mediasources = {};
    this.current = false;
    this.started = false;

    decoder.on('data', (chunk) => {
      this.clients.forEach((client) => {
        client.write(chunk);
      });

      return this;
    });
  }

  start() {
    if (this.started) return;

    this.current = this.current || this.getNext();

    this.send(this.current);

    return this;
  }

  send(playable) {
    playable.on('data', (chunk) => {
      this.decoder.write(chunk);
    });

    playable.on('end', () => {
      playable.stop();

      const next = this.getNext();

      delete this.current;
      this.current = next;

      this.send(next);
    });
  }

  write(chunk) {
    this.decoder.write(chunk);

    return this;
  }

  /**
   * Register a new client
   *
   * @param Client client Client instance
   *
   * @return MediaSource this This instance
   */
  registerClient(client) {
    if (!(client instanceof Client)) {
      throw new Error('The given client must be an instance of Client');
    }

    this.clients.push(client);

    return this;
  }

  /**
   * Unregister the given client
   *
   * @param Client client Client instance
   *
   * @return MediaSource this This instance
   */
  unregisterClient(client) {
    const index = _.findIndex(this.clients, client);
    client.active = false;

    if (index !== -1) {
      delete this.clients.splice(index, 1);
    }

    if (this.clients.length == 0) {
      console.log('No more clients');
      this.started = false;
    }

    return this;
  }

  addMediasource(name, mediasource) {
    name = name || mediasource.getName();

    if (_.isUndefined(name)) {
      throw new Error('The given mediasource must hava a name!');
    }

    if (!(mediasource instanceof MediaSource)) {
      throw new Error('The given mediasource is not an instance of MediaSource!');
    }

    if (_.isUndefined(this.mediasources[name])) {
      this.mediasources[name] = mediasource;
    }

    return this;
  }

  removeMediasource(name) {
    if (!_.isUndefined(this.mediasources[name])) {
      delete this.mediasources[name];
    }

    return this;
  }

  getNext() {
    throw new Error('A stream must implement a getNExt method');
  }
}

module.exports = MediaStream;
