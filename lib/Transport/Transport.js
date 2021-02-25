const { TRANSPORT_PROTO } = require('./Constants');

function Transport({ type = TRANSPORT_PROTO }) {
  const consumers = [];

  function getConsumers() {
    return consumers;
  }

  function getType() {
    return type;
  }

  function addConsumer(consumer) {
    consumers.push(consumer);
  }

  function removeConsumer() {

  }

  function write() {}

  return Object.freeze({
    addConsumer,
    getConsumers,
    getType,
    removeConsumer,
    write
  });
}

module.exports = Transport;
