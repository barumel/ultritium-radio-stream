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
  constructor(destination) {
    this.destination = destination;
  }

  /**
   * Sent the given sream
   *
   * @param PassThrough stream Node PassThrough stream
   *
   * @return Transport this This instance
   */
  send(stream) {
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
