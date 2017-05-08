const _ = require('lodash');

class Client {
  /**
   * Merge the given client metadata with this instance and assign the transport
   *
   * @param Object    meta      Meta data
   * @param Transport transport Transport instance
   *
   * @return Client this This instance
   */
  constructor(meta, transport) {
    _.assign(this, meta);
    this.transport = transport;
  }

  /**
   * Stream the given stream to the given destination
   *
   * @param PassThrough stream Node PassThrough stream
   *
   * @return Client this This instance
   */
  stream(stream) {
    stream.pipe(this.destination);

    return this;
  }
}
