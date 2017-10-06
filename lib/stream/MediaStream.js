const Promise = require('bluebird');
const MultiStream = require('multistream');
const EventEmitter = require('events');
const _ = require('lodash');

const Client = require('../client/Client');
const Playlist = require('../playlist/Playlist');
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
  constructor(playlist, decoder, encoder) {
    super();

    if (!(playlist instanceof Playlist)) throw new Error('Parameter playlist must be an instance of PlayList!');
    if (_.isUndefined(decoder) || !_.isObject(decoder)) throw new Error('Parameter decorder must be set!');
    if (_.isUndefined(encoder) || !_.isObject(encoder)) throw new Error('Parameter encoder must be set!');

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
     * Clients listening to this stream
     *
     * @type {Object}
     */
    this.clients = {};

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
      _.forEach(clients, (client) => client.write(chunk));
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
   * Get a mediasource by name
   *
   * @param  {String} name MediaSource name
   *
   * @return {MediaSource} mediasource MediaSource or undefined
   */
  getMediaSource(name) {
    if (!this.hasMediaSource(name)) throw new Error(`No mediasource with name ${name} registered!`);

    return this.mediasources[name];
  }

  /**
   * Add a new mediasource
   *
   * @param {MediaSource} mediasource MediaSource instance
   *
   * @return {MediaStream} this This instance
   */
  registerMediaSource(mediasource) {
    if (!(mediasource instanceof MediaSource)) {
      throw new Error('The given mediasource is not an instance of MediaSource!');
    }

    if (this.hasMediaSource(mediasource.getName())) throw new Error(`MediaSource with name ${mediasource.getName()} already added!`)

    if (!this.hasMediaSource(mediasource.getName())) {
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
  unregisterMediaSource(name) {
    if (!this.hasMediaSource(name)) throw new Error(`No MediaSource with name ${name} registered!`)
    if (!_.isUndefined(this.mediasources[name])) {
      delete this.mediasources[name];
    }

    return this;
  }

  /**
   * Check whether a client with the given id is registered or not
   *
   * @param  {String} id Client id
   *
   * @return {Boolean}
   */
  hasClient(id) {
    return !_.isUndefined(this.clients[id]);
  }

  /**
   * Get a client by id
   *
   * @param  {String} id Client id
   *
   * @return {Client} client Client instance
   */
  getClient(id) {
    if (!this.hasClient(id)) throw new Error(`No client with id ${id} registered!`);

    return this.clients[id];
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
      throw new Error('The given client must be an instance of Client!');
    }

    if (this.hasClient(client.getId())) throw new Error(`Client with id ${client.getId()} already registered!`);

    this.clients[client.getId()] = client;

    return this;
  }

  /**
   * Unregister the given client and stop streaming if no more clients are active
   *
   * @param String client Client id or Client instance
   *
   * @return MediaSource this This instance
   */
  unregisterClient(client) {
    let id = client;
    if (client instanceof Client) id = client.getId()




    const index = _.findIndex(this.clients, client);
    if (index === -1) throw new Error('No such client registered!')

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
