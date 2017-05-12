const Playable = require('./playable');

class PlayableYoutube extends Playable {
  constructor(meta) {
    super(meta);
  }

  /**
   * Decoding the stream is faster than the duration of the given video.
   * Delay the end event till the song has finished
   *
   * @return PlayableYoutube this This instance
   */
  end() {
    console.log('Stream ended...');
    console.log(super.end);
    if (this.duration > this.started) {
      const left = new Date() - this.started;

      // Delay end event till the song is finished
      setTimeout(() => {
        // super end
      }, left);

      return this;
    }
  }
}


module.exports = PlayableYoutube;
