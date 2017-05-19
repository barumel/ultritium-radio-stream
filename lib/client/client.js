const EventEmitter = require('events');
const uuid = require('uuid/v1');

const _ = require('lodash');

class Client extends EventEmitter {
  /**
   * Merge the given client metadata with this instance and assign the transport
   *
   * @param Transport transport Transport instance
   * @param Object    meta      Meta data
   *
   * @return Client this This instance
   */
  constructor(transport, meta = {}) {
    super();

    this.id = uuid();
    this.meta = meta;
    this.transport = transport;
  }

  /**
   * Send the given stream to the given destination
   *
   * @param PassThrough stream Node PassThrough stream
   *
   * @return Client this This instance
   */
  write(chunk) {
    this.transport.write(chunk);

    return this;
  }

  /**
   * Stop streaming to the client
   *
   * @return Client this this instance
   */
  stop() {
    this.transport.end();

    return this;
  }

  /**
   * Pause streaming
   *
   * @return Client this This instance
   */
  pause() {

  }

  /**
   * End streaming to this client
   *
   * @return Client this This instance
   */
  end() {

  }
}


module.exports = Client;
