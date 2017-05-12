const _ = require('lodash');
const Speaker = require('speaker');

const Transport = require('./translport');

class TransportSpeaker extends Transport {
  constructor() {
    const destination = new Speaker();
    super(destination);
  }

  /**
   * Sent the given sream to the given destination
   *
   * @param PassThrough stream Node PassThrough stream
   *
   * @return Transport this This instance
   */
  start(stream) {
    stream.pipe(this.destination);

    return this;
  }

  /**
   * End sreaming to the given destination
   *
   * @return Transport this This instance
   */
  end() {
    this.destination.end();

    return this;
  }
}

module.exports = TransportSpeaker;
