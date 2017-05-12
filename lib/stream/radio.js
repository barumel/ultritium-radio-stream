const _ = require('lodash');
const DecoderLame = require('../decoder/lame');

const MediaStream = require('./stream');

class MediaStreamRadio extends MediaStream {
  constructor(playlist, decoder, options) {
    decoder = decoder || new DecoderLame();
    super(playlist, decoder, options);
  }

  /**
   * Return a random item of the given playlist
   *
   * @return PlaylistItem item Next item in playlist
   */
  getNext() {
    const index = Math.floor((Math.random() * this.playlist.count()));
    const meta = this.playlist.get(index);

    const mediasource = this.mediasources[meta.source];
    if (_.isUndefined(mediasource)) {
      throw new Error(`No mediasource with name ${meta.source} found!`);
    }

    const playable = mediasource.get(meta);

    return playable;
  }
}

module.exports = MediaStreamRadio;
