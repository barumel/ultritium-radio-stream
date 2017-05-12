'use strict';

const Speaker = require('speaker');
const decoder = require('lame').Decoder;

const MediaSourceYoutube = require('../../lib/mediasource/youtube');



// Create a new mediasource instance
const mediasource = new MediaSourceYoutube();

const meta = {
  id: 1,
  source: 'youtube',
  uri: 'https://www.youtube.com/watch?v=j1FwlQhFLQQ',
  duration: 188000
};

const meta2 = {
  id: 2,
  source: 'youtube',
  uri: 'https://www.youtube.com/watch?v=WrrJSKqL1oA',
  duration: 30000
}

// Get the given song
const stream = mediasource.get(meta2);
console.log(stream);

// Pipe the result to the decoder / speaker
stream.pipe(decoder())
  .pipe(new Speaker());
