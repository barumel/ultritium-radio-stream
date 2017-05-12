class Decoder {
  constructor() {

  }

  encode(playable) {
    throw new Error('You must implement your own encode method!');
  }

  decode(playable) {
    throw new Error('You must implement your own decode method!');
  }
}

module.exports = Decoder;
