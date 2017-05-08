const _ = require('lodash');

class Playable {
  constructor(stream, meta) {
    _.extend(stream, this):        
    _.assign(this, meta);

    this.started = new Date();
  }

  getDuration() {
    return this.duration;
  }
}
