const ffmpeg = require('fluent-ffmpeg');
const Speaker = require('speaker');

const Youtube = require('./Mediasource/Youtube');
const Queue = require('./Queue/Queue');

const logDeep = require('./Utils/logDeep');

(async function run() {
  const source = Youtube();
  const playable = await source.getPlayable({ uri: 'https://www.youtube.com/watch?v=a8c5wmeOL9o' });

  console.log('PL', playable);

  const queue = Queue();
  queue.addPlayable(playable);
  //console.log('QS', queue.getStream());


  ffmpeg(queue.getStream())
    .format('wav')
    .audioBitrate(128)
    .pipe(new Speaker());

queue.play();

  //logDeep(playable);
}());

process.stdin.resume();
