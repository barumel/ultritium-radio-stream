const { PassThrough } = require('stream');
const ffmpeg = require('fluent-ffmpeg');

const { TRANSPORT_SPEAKER } = require('./Constants');
const Transport = require('./Transport');

function TransportSpeaker() {
  const proto = Transport({ type: TRANSPORT_SPEAKER });
  const input = new PassThrough();
  const output = new PassThrough();

  input.on('data', (chunk) => {
    // console.log(`Transport Received ${chunk.length} bytes of data.`);
  })

  input.on('end', () => {
    // console.log('Input ended');
  })

  output.on('data', (chunk) => {
    // console.log(`Transport Sends ${chunk.length} bytes of data.`);
    const consumers = proto.getConsumers();
    consumers.map((consumer) => consumer.write(chunk));
  });

  output.on('end', () => {
    console.log('OUTPUT ENDED');
  })


  const foo = ffmpeg(input)
    .format('wav')
    .audioBitrate(128)
    .pipe(output);

/*
  const converter = ffmpeg(input)
    .format('wav')
    .audioBitrate(128)
    .on('data', (chunk) => {
      console.log('CONVERTER IN');
    })
    .on('end', () => {
      console.log('CNVERTED ENDED');
    })
    */

  //console.log('CONVERTER', foo);

  function write(chunk) {
    const consumers = proto.getConsumers();

    //consumers.map((consumer) => consumer.write(chunk));
     input.write(chunk);
    //converter.write(chunk);
  }

  return Object.freeze({
    ...proto,
    write
  });
}

module.exports = TransportSpeaker;
