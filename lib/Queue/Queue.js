const { PassThrough } = require('stream');
const { get } = require('lodash');
const Throttle = require('throttle-stream');

function Queue() {
  const playables = [];
  const stream = new PassThrough();

  function addPlayable(playable) {
    playables.push(playable);
  }

  function removePlayable(id) {
    const index = playables.findIndex((p) => p.getId());
    if (index > -1) playables.splice(index, 1);
  }

  function getNextPlayable() {
    // Remove the first item from playbles, and append it to the end
    const playable = playables.shift();
    playables.push(playable);

    return playable;
  }

  function play() {
    //const index = Math.floor(Math.random() * Math.floor(get(playables, 'length', 0)));
    const playable = getNextPlayable();

    // Use 128 Bit as default, but playables should have a bitrate prop on metadata...
    const bps = (get(playable.getMetadata(), 'audio.bitrate', 128) * 1000) / 8;
    const throttle = new Throttle({ bytes: bps, interval: 1000 });

    playable.getStream().pipe(throttle);

    throttle.on('data', (chunk) => {
      console.log('T2 o');
      console.log(`Received ${chunk.length} bytes of data.`);
      stream.write(chunk);

    });

    throttle.on('end', () => console.log('FINTSCH'))
  }

  function getStream() {
    return stream;
  }

  return Object.freeze({
    addPlayable,
    getStream,
    removePlayable,
    play
  });
}

module.exports = Queue;
