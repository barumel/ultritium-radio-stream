/**
 * Basic translport class
 */
class Transport {
  /**
   * Constructor
   *
   * @param String name        Transport name
   * @param Object destination Transport destination
   *
   * @return void
   */
  constructor(destination, encoder) {
    this.destination = destination;
    this.encoder = encoder;
  }

  /**
   * Sent the given sream
   *
   * @param PassThrough stream Node PassThrough stream
   *
   * @return Transport this This instance
   */
  write(chunk) {
    throw new Error('You must implement a send method!');
  }

  /**
   * End sreaming
   *
   * @return Transport this This instance
   */
  end() {
    throw new Error('You must implement an end method!');
  }
}


module.exports = Transport;
