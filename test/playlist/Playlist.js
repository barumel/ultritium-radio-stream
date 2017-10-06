const assert = require('assertthat');
const Playlist = require('../../lib/playlist/Playlist');
const PlaylistItem = require('../../lib/playlist/Item');

describe('Playlist Tests', () => {
  describe('Test add method', () => {
    it('Add must throw an error if the given item is not an instance of PlaylistItem', (done) => {
      assert.that(() => {
        const playlist = new Playlist();
        playlist.add('i am a string');
      }).is.throwing('A playlist item must be an instance of PlaylistItem!');
      done();
    });

    it('Should contain an item after add was called with a valid PlaylsitItem', (done) => {
      const playlist = new Playlist();
      const item = new PlaylistItem({});
      playlist.add(item);

      assert.that(playlist.count()).is.equalTo(1);
      done();
    });
  });

  describe('Test remove method', () => {
    it('Should be empty after an item was added and removed!', (done) => {
      const playlist = new Playlist();
      const item = new PlaylistItem({});
      playlist.add(item);
      // Retest add... actually not necessaty because add was already testes...
      assert.that(playlist.count()).is.equalTo(1);

      playlist.remove(item);
      assert.that(playlist.empty()).is.true();
      done();
    });
  });
});
