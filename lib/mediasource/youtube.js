const _ = require('lodash');
const ytdl = require('ytdl-core');
const FFmpeg = require('fluent-ffmpeg');

const MediaSource = require('./mediasource');
const PlayableYoutube = require('../playable/youtube');

class MediaSourceYoutube extends MediaSource {
  /**
   * Constructor
   *
   * @param String name   Name of this mediasource
   * @param Object config Mediasource configuration
   *
   * @return void
   */
  constructor(config = {}) {
    super('youtube', config);

    this.authenticate(config);
  }

  /**
   * Get the given song by its metadata
   *
   * @param Object meta Metadata
   *
   * @return ReadableStream stream Stream object
   */
  get(meta, options = {}) {
    // Defaults for youtube downloader
    const defaults = {
      filter: (format) => {
        return format.container === ('mp4');
      },
      highWaterMark: Math.pow(2,16),
      quality: 'highest'
    };

    options = _.defaults(defaults, options);

    const source = ytdl(meta.uri, options);

    // Overwrite the default end method.
    // The source stream finishes before the actual playback finishes.
    // Wait for the duration of the current song to end the stream.
    const end = source.end;
    const destroy = source.destroy;
    source.end = () => {};

    const playable = new PlayableYoutube(meta);
    const ffmpeg = FFmpeg(source);
    const stream = ffmpeg.format('mp3')
      .pipe(playable);

    setTimeout(() => {
      end.call(source);
      source.destroy();
    }, meta.duration);

    return playable;
  }

}

module.exports = MediaSourceYoutube;
