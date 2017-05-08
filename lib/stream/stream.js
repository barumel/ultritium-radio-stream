
'use strict';

const PassThrough = require('stream').PassThrough;

class MediaStream extends PassThrough {
  constructor(playlist, options = {}) {
    super(options);
    this.playlist = playlist;
    this.clients = [];
    this.current = false;
  }

  /**
   * Start streaming to the registered clients
   *
   * @return MediaStream this This instance
   */
  start() {
    const playable = this.current || this.getNext();

    this.send(playable);

    return this;
  }

  send(stream) {
    this.clients.forEach((client) => {
      client.stream(this);
    });

    stream.pipe(this.decoder)
      .pipe(this);

    return this;
  }

  /**
   * End this stream. Overwrite the default end method. Only end the stream if
   * there is no client left listening to it
   *
   * @return MediaStream this This instance
   */
  end() {
    if (this.client.length === 0) {
        //return super end
    }

    const next = this.getNext();

    this.send(next);

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

    if (index !== -1) {
      delete this.splice(index, 1);
    }

    return this;
  }

  getNext() {
    throw new Error('A stream must implement a getNExt method');
  }
}
