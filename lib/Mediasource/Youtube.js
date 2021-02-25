const { PassThrough } = require('stream');
const ytdl = require('ytdl-core');
const formatUtils = require('ytdl-core/lib/format-utils.js');
const { get, defaultsDeep } = require('lodash');
const ffmpeg = require('fluent-ffmpeg');

const Mediasource = require('./Mediasource');
const Playable = require('../Playable/Playable');

const { MEDIA_SOURCE_YOUTUBE } = require('./Constants');

function MediaSourceYoutube() {
  const proto = Mediasource({ source: MEDIA_SOURCE_YOUTUBE });

  async function getMetadata(uri) {
    const info = await ytdl.getInfo(uri);
    const { formats } = info;

    // Choose the format based on quality (highest available) and format (only audio)
    // To be able to add audio info to metadata
    const format = formatUtils.chooseFormat(formats, { filter: 'audioonly' , quality: 'highestaudio' });

    return {
      id: get(info, 'videoDetails.videoId'),
      playable: get(info, 'player_response.playabilityStatus.status') === 'OK',
      audio: {
        bitrate: get(format, 'audioBitrate', 128),
        codec: get(format, 'audioCodec'),
        channels: get(format, 'audioChannels', 2),
        duration: get(format, 'approxDurationMs'),
        sampleRate: get(format, 'audioSampleRate'),
        quality: get(format, 'audioQuality')
      },
      info: {
        channel: get(info, 'videoDetails.channelId'),
        title: get(info, 'videoDetails.title', ''),
        description: get(info, 'videoDetails.description', ''),
        keywords: get(info, 'videoDetails.keywords', []),
        thumbnails: get(info, 'videoDetails.thumbnails', [])
      }
    };
  }

  async function getStream(uri, options = {}) {
    const defaults = {
      filter: 'audioonly',
      quality: 'highest'
    };

    const source = ytdl(uri, defaultsDeep({}, options, defaults));
    const output = new PassThrough();

    ffmpeg(source).format('mp3')
    .audioBitrate(128)
    .pipe(output);

    return output;

    // return ytdl(uri, defaultsDeep({}, options, defaults));
/*
    const speaker = new Speaker();
    const pass = PassThrough();

    pass.on('data', (chunk) => {
      console.log(`pass ${chunk.length} bytes of data.`);
      speaker.write(chunk);
    })

    ffmpeg(stream)
      .format('wav')
      //.withAudioCodec('pcm_s16le')
      .audioBitrate(128)
      .pipe(pass);
      /*
      .on('data', (chunk) => {
        console.log(`ffm ${chunk.length} bytes of data.`);
        speaker.write(chunk)
      })
      //.on('data', (chunk) => decoder.write(chunk));
      //.save(`${__dirname}/foo.ogg`)
      //.pipe(new Speaker());
/*
    stream.on('data', (chunk) => {
       //destination.write(chunk);
       console.log(`Received ${chunk.length} bytes of data.`);

    });
    */
  }

  async function getPlayable({ uri, options = {} }) {
    const metadata = await getMetadata(uri, options);
    const stream = await getStream(uri, options);

    return Playable({ metadata, stream });
  }

  return Object.freeze({
    ...proto,
    getMetadata,
    getStream,
    getPlayable
  });
}

module.exports = MediaSourceYoutube;
