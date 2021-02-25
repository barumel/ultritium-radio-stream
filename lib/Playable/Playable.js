function Playable({ metadata, stream }) {
  stream.on('end', () => console.log('PLAYABLE ENDED'))
  function getId() {
    return 'Foo';
  }

  function getMetadata() {
    return metadata;
  }

  function getStream() {
    return stream;
  }

  console.log('I BO CALLED WORDà', {
    getId,
    getMetadata,
    getStream
  });

  return Object.freeze({
    getId,
    getMetadata,
    getStream
  });
}

module.exports = Playable;
