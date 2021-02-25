const { PassThrough } = require('stream');
const { get, set, cloneDeep } = require('lodash');
const Throttle = require('throttle-stream');
const MultiStream = require('multistream');
const T = require('throttle');

const Youtube = require('../Mediasource/Youtube');

function Queue() {
  const playables = [];
  const transports = [];
  const stream = new PassThrough();
  stream.on('end', () => console.log('DONE'))
  const state = {
    started: false
  };

  const items = [
    'https://www.youtube.com/watch?v=a8c5wmeOL9o',
    'https://www.youtube.com/watch?v=OEwY8VVZDLs',
  ];

  const source = Youtube();

  function addPlayable(playable) {
    playables.push(playable);
  }

  function removePlayable(id) {
    const index = playables.findIndex((p) => p.getId());
    if (index > -1) playables.splice(index, 1);
  }

  function addTransport(transport) {
    transports.push(transport);
  }

  function removeTransport() {

  }

  function play() {
    const streams = playables.map((playable) => {
      // Use 128 Bit as default, but playables should have a bitrate prop on metadata...
      const bps = (get(playable.getMetadata(), 'audio.bitrate', 128) * 1000) / 8;
      //const throttle = new Throttle({ bytes: bps, interval: 1000 });
      const throttle = new T(bps);

      playable.getStream().pipe(throttle);

      return throttle;
    });


    const stream = new MultiStream(getNextPlayable);

    stream.on('data', (chunk) => {
      //console.log(` Multistream Received ${chunk.length} bytes of data.`);
      transports.map((transport) => transport.write(chunk));
    });
  }

  async function getNextPlayable(cb) {
    // Remove the first item from playbles, and append it to the end
    //const playable = playables.shift();
    //playables.push(playable);
    const uri = items.shift();
    console.log('MAMAMAMAMAMAMAMAMAMAMA', uri);
    const playable = await source.getPlayable({ uri });
    items.push(uri);
console.log('ipipip', playable.getMetadata());

    //const bps = (get(playable.getMetadata(), 'audio.bitrate', 128) * 1000) / 8;
    const bps = (128 * 1000) / 8;
    console.log('BPS', bps);
    //const throttle = new Throttle({ bytes: bps, interval: 1000 });
    const throttle = new T(bps);

    throttle.on('end', () => {
      console.log('TROTTEL END');
      throttle.destroy();
    });

    playable.getStream().pipe(throttle);

    console.log('FUTZI');
    setTimeout(() => {
      console.log('PUTZI');
      return cb(null, throttle);
    }, 1000);

  }

  async function next() {
    const playable = await getNextPlayable();
    console.log('PLAYABLE TO PLAY', playable.getMetadata());
    // Use 128 Bit as default, but playables should have a bitrate prop on metadata...
    const bps = (get(playable.getMetadata(), 'audio.bitrate', 128) * 1000) / 8;
    const throttle = new Throttle({ bytes: bps, interval: 1000 });

    playable.getStream().pipe(throttle);

    throttle.on('data', (chunk) => {
      // stream.write(chunk)
      transports.map((transport) => transport.write(chunk));
    });

    throttle.on('end', () => {
      console.log('FINISHED, GET NEXT');
      next();
    });
  }

  /*
  function play() {
    set(state, 'started', true);

    next();

    /*
    //const index = Math.floor(Math.random() * Math.floor(get(playables, 'length', 0)));
    const playable = getNextPlayable();

    // Use 128 Bit as default, but playables should have a bitrate prop on metadata...
    const bps = (get(playable.getMetadata(), 'audio.bitrate', 128) * 1000) / 8;
    const throttle = new Throttle({ bytes: bps, interval: 1000 });

    playable.getStream().pipe(throttle);

    throttle.on('data', (chunk) => stream.write(chunk));

    throttle.on('end', () => console.log('FINTSCH'))
    */
  //}


  function getStream() {
    return stream;
  }

  return Object.freeze({
    addPlayable,
    addTransport,
    getStream,
    removePlayable,
    removeTransport,
    play
  });
}

module.exports = Queue;
