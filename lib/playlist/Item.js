const _ = require('lodash');

/**
 * Basic playlist item.
 */
class PlaylistItem {
  /**
   * Constructor
   *
   * @param Object meta Metadata object
   *
   * @return void
   */
  constructor(meta) {
    if (!_.isPlainObject(meta)) throw new Error('Meta must be an object!');
    _.assign(this, meta);
  }

  /**
   * Get the mediasource of this item
   *
   * @return {String} mediasource Mediasource name
   */
  getSource() {
    return this.source;
  }
}

module.exports = PlaylistItem;
