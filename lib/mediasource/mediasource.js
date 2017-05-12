'use strict';

const _ = require('lodash');

class MediaSource {
  /**
   * Constructor
   *
   * @param String name   Name of this mediasource
   * @param Object config Mediasource configuration
   *
   * @return void
   */
  constructor(name, config = {}) {
    if (_.isUndefined(name) || !_.isString(name)) {
      throw new Error('A mediasource must have a name!');
    }

    this.name = name;
    this.config = config;
  }

  /**
   * Authenticate
   *
   * @param Object config Configuration object
   *
   * @return Boolean authenticated True / False
   */
  authenticate(config) {
    return true;
  }

  /**
   * Get the given song by its metadata
   *
   * @param Object meta Metadata
   *
   * @return ReadableStream stream Stream object
   */
  get(meta) {
    throw new Error('You must implement your own get method!');
  }

  /**
   * Get the name of this mediasource
   *
   * @return String name Mediasource name
   */
  getName() {
    return this.name;
  }
}

module.exports = MediaSource;
