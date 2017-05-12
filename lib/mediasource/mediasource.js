'use strict';

const _ = require('lodash');

class MediaSource {
  constructor(name, config = {}) {
    if (_.isUndefined(name) || !_.isString(name)) {
      throw new Error('A mediasource must have a name!');
    }

    this.name = name;
    this.config = config;
  }

  authenticate() {

  }

  get(meta) {
    throw new Error('You must implement your own get method!');
  }

  getName() {
    return this.name;
  }
}

module.exports = MediaSource;
