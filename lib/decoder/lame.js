const lame = require('lame');

const Decoder = require('./decoder');

class DecoderLame extends Decoder {
  constructor() {
    super();
    this.current = false;
  }

  decode(playable) {
    if (this.current) delete this.current;

    this.current = lame.Decoder();

    return playable.pipe(this.current);
    //return playable.pipe(lame.Decoder());
  }
}

module.exports = DecoderLame;
