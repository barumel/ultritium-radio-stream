const _ = require('lodash');

class Playable {
  constructor(meta) {
    this.meta = meta;

    this.started = new Date();
  }

  getDuration() {
    return this.meta.duration;
  }
}

module.exports = Playable;
