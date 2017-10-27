const EventEmitter = require('events');
const uuid = require('uuid/v1');

const _ = require('lodash');

class Client extends EventEmitter {
  /**
   * Merge the given client metadata with this instance and assign the transport
   *
   * @param Object target Transport instance
   * @param Object meta   Meta data
   *
   * @return Client this This instance
   */
  constructor(target, meta = {}) {
    super();

    this.id = uuid();
    this.meta = meta;
    this.target = target;
  }

  start(stream) {
    const { target } = this;
    stream.pipe(target);

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
    this.target.end();

    return this;
  }

  /**
   * Get the client id
   *
   * @return {String} id Client uuid
   */
  getId() {
    return this.id;
  }

  /**
   * Return the stream target
   *
   * @return {Object} target Stream target
   */
  getTarget() {
    return this.target;
  }
}


module.exports = Client;
