const ffmpeg = require('fluent-ffmpeg');
const Speaker = require('speaker');

const Youtube = require('./Mediasource/Youtube');
const Queue = require('./Queue/Queue');
const Transport = require('./Transport/Speaker');

const logDeep = require('./Utils/logDeep');

(async function run() {
  const source = Youtube();
  const playable = await source.getPlayable({ uri: 'https://www.youtube.com/watch?v=a8c5wmeOL9o' });
  const playable2 = await source.getPlayable({ uri: 'https://www.youtube.com/watch?v=OEwY8VVZDLs' });

  console.log('PL', playable);

  const transport = Transport();
  transport.addConsumer(new Speaker());

  const queue = Queue();
  queue.addPlayable(playable);
  queue.addPlayable(playable2);
  queue.addTransport(transport);
  //console.log('QS', queue.getStream());

/*
  ffmpeg(playable.getStream())
    .format('wav')
    .audioBitrate(128)
    .pipe(new Speaker());

*/
  ffmpeg(queue.getStream())
    .format('wav')
    .audioBitrate(128)
    .pipe(new Speaker());


queue.play();

  //logDeep(playable);
  setTimeout(() => {

  }, 5000);
}());

process.stdin.resume();
