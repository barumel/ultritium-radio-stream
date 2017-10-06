const Playable = require('./playable');

class PlayableYoutube extends Playable {
  /**
   * Constructor
   *
   * @param Object meta Metadata
   *
   * @return void
   */
  constructor(meta) {
    super(meta);
  }
}


module.exports = PlayableYoutube;
