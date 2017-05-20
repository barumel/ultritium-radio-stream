const PassThrough = require('stream').PassThrough;

const _ = require('lodash');

class Playable extends PassThrough {
  /**
   * Constructor
   *
   * @param Object meta Metadata
   *
   * @return void
   */
  constructor(meta) {
    super();

    this.meta = meta;
    this.started = new Date();
  }

  /**
   * Stop streaming
   *
   * @return Playable this This instance
   */
  stop() {
    this.unpipe();
    this.removeAllListeners();
    //this.end();
    //this.destroy();
  }
}

module.exports = Playable;
