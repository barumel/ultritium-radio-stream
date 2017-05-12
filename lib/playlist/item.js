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
    _.assign(this, meta);
  }
}

module.exports = PlaylistItem;
