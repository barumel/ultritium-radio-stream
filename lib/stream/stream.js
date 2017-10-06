const Promise = require('bluebird');
const MultiStream = require('multistream');
const EventEmitter = require('events');
const _ = require('lodash');

const Client = require('../client/client');
const Playlist = require('../playlist/playlist');
const MediaSource = require('../mediasource/mediasource');

class MediaStream extends EventEmitter {
  /**
   * constructor
   *
   * @param  {Playlist} playlist Playlist instance
   * @param  {Object}   decorder Decoder (e.g. lame)
   * @param  {Object}   encoder  Encoder (e.g. lame)
   *
   * @return void
   */
  constructor(playlist, decorder, encoder) {
    super();

    /**
     * Playlist instance
     *
     * @type {Playlist}
     */
    this.playlist = playlist;

    /**
     * Decoder
     *
     * @type {Object}
     */
    this.decorder = decoder;

    /**
     * Encoder
     *
     * @type {Object}
     */
    this.encoder = encoder;

    /**
     * Array of clients listening to this stream
     *
     * @type {Array}
     */
    this.clients = [];

    /**
     * Registered mediasources
     *
     * @type {Object}
     */
    this.mediasources = {};

    /**
     * Multistream instance
     *
     * @type {Multistream}
     */
    this.stream;
  }

  /**
   * Start streaming
   *
   * @return {MediaStream} this This instance
   */
  play() {
    const {  encoder, decoder } = this;

    this.stream = MultiStream(this.next)
    .pipe(decoder)
    .pipe(encoder);

    encoder.on('data', (chunk) => {
      const { clients } = this;
      clients.forEach((client) => client.write(chunk));
    });
  }

  /**
   * Add the next song to the stream
   *
   * @param {Function} cb Callback from multistream
   *
   * @return {MediaStream} this This instance
   */
  next(cb) {
    const { playlist } = this;
    const item = playlist.next();
    if (!this.hasMediaSource(item.getMediaSource())) return next(cb);

    const mediasource = this.getMediaSource(name);
    cb(null, mediasource.get(item));
  }


  /**
   * Get a mediasource by name
   *
   * @param  {String} name MediaSource name
   *
   * @return {MediaSource} mediasource MediaSource or undefined
   */
  getMediaSource(name) {
    return this.mediasources[name];
  }

  /**
   * Is there a mediasource with the given name
   *
   * @param  {String} name MediaSource name
   *
   * @return {Boolean}
   */
  hasMediaSource(name) {
    return !_.isUndefined(this.mediasources[name])
  }

  /**
   * Add a new mediasource
   *
   * @param {MediaSource} mediasource MediaSource instance
   *
   * @return {MediaStream} this This instance
   */
  addMediaSource(mediasource) {
    if (!(mediasource instanceof MediaSource)) {
      throw new Error('The given mediasource is not an instance of MediaSource!');
    }

    if (_.isUndefined(this.mediasources.getName())) {
      this.mediasources[mediasource.getName()] = mediasource;
    }

    return this;
  }

  /**
   * Remove the given mediasource
   *
   * @param  {[type]} name Name of the mediasource
   *
   * @return {MediaStream} this This instance
   */
  removeMediaSource(name) {
    if (!_.isUndefined(this.mediasources[name])) {
      delete this.mediasources[name];
    }

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
   * Unregister the given client and stop streaming if no more clients are active
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
      this.end();
    }

    return this;
  }

  /**
   * Get the encoder
   *
   * @return {Object} encoder Encoder instance
   */
  getEncoder() {
    return this.encoder;
  }

  /**
   * Set or overwrite the encoder
   *
   * @param {object} encoder Encoder instance
   *
   * @return MediaSource this This instance
   */
  setEncoder(encoder) {
    this.encoder = encoder;

    return this;
  }

  /**
   * Get the decoder
   *
   * @return {object} decoder Decoder instance
   */
  getDecoder() {
    return this.decoder;
  }

  /**
   * Set or overwrite the decoder
   *
   * @param {Object} decoder Decoder instance
   *
   * @return MediaSource this This instance
   */
  setDecoder(decoder) {
    this.decoder = decoder;

    return this;
  }

  /**
   * Get the current MultiStream instance
   *
   * @return {MultiStream} stream MultiStream instance or undefined
   */
  getStream() {
    return this.stream;
  }
}

module.exports = MediaStream;
