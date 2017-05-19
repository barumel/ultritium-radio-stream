const Transport = require('./transport');
const lame = require('lame');

class TransportExpress extends Transport {
  constructor(destination, encoder) {
    super(destination);
    this.encoder = encoder || new lame.Encoder({channels: 2, bitDepth: 16, sampleRate: 44100});

    const listener = (chunk) => {
      this.destination.write(chunk);
    }

    this.listener = listener;
    this.encoder.on('data', listener);
  }

  /**
   * Sent the given sream to the given destination
   *
   * @param PassThrough stream Node PassThrough stream
   *
   * @return Transport this This instance
   */
  write(chunk) {
    this.encoder.write(chunk);

    return this;
  }

  /**
   * End sreaming to the given destination
   *
   * @return Transport this This instance
   */
  end() {
    this.active = false;
    this.encoder.removeListener('data', this.listener);

    this.destination.end();

    return this;
  }
}


module.exports = TransportExpress;
