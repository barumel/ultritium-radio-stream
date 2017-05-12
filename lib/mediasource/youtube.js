'use strict';

const _ = require('lodash');
const ytdl = require('ytdl-core');
const FFmpeg = require('fluent-ffmpeg');

const MediaSource = require('./mediasource');
const PlayableYoutube = require('../playable/youtube');

class MediaSourceYoutube extends MediaSource {
  constructor(config = {}) {
    super('youtube', config);
  }

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
    source.end = () => {
      console.log('END WAS CALLED');
    };

    setTimeout(() => {
      console.log('END!!!');
      end.call(source);
    }, meta.duration);

    const stream = FFmpeg(source)
      .format('mp3');

    const playable = new PlayableYoutube(meta);

    _.extend(stream, playable);

    return stream;
  }

}

module.exports = MediaSourceYoutube;
