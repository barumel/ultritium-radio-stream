const { PassThrough } = require('stream');
const { defaultsDeep } = require('lodash');

const { MEDIA_SOURCE_PROTO } = require('./Constants');

function Mediasource({ source = MEDIA_SOURCE_PROTO}) {
  function getSource() {
    return source;
  }

  async function getMetadata(uri) {
    return {};
  }

 // Must return PassThrough
  async function getStream(uri, options = {}) {
    const stream = new PassThrough();
    stream.end();

    return stream;
  }

  async function getPlayable(uri) {
    const metadata = await getMetadata(url);
    const stream = await getStream(url);

    return {
      source: getSource(),
      metadata,
      stream
    };
  }

  return Object.freeze({
    getMetadata,
    getStream,
    getSource,
    getPlayable
  });
}

module.exports = Mediasource;
