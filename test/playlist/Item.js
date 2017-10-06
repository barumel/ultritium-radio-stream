const assert = require('assertthat');
const PlaylistItem = require('../../lib/playlist/Item');

describe('PlaylistItem Tests', () => {
  describe('Test constructor', () => {
    it('Must throw an error if constructor is called without metadata', (done) => {
      assert.that(() => {
        const item = new PlaylistItem();
      }).is.throwing('Meta must be an object!');
      done();
    });
  });
});
