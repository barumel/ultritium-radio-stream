const _ = require('lodash');

class Playable {
  /**
   * Constructor
   *
   * @param Object meta Metadata
   *
   * @return void
   */
  constructor(meta) {
    this.meta = meta;

    this.started = new Date();
  }
}

module.exports = Playable;
