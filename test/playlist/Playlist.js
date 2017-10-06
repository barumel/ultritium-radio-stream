const assert = require('assertthat');
const Playlist = require('../../lib/playlist/Playlist');
const PlaylistItem = require('../../lib/playlist/Item');

describe('Playlist Tests', () => {
  describe('Test add method', () => {
    it('Add must throw an error if the given item is not an instance of PlaylistItem', (done) => {
      assert.that(() => {
        const playlist = new Playlist({name: 'test'});
        playlist.add('i am a string');
      }).is.throwing('A playlist item must be an instance of PlaylistItem!');

      done();
    });

    it('Should contain an item after add was called with a valid PlaylsitItem', (done) => {
      const playlist = new Playlist({name: 'test'});
      const item = new PlaylistItem({});
      playlist.add(item);

      assert.that(playlist.count()).is.equalTo(1);

      done();
    });

    it('Must return the same instance of playlist (fluent interface)', (done) => {
      const playlist = new Playlist({name: 'test'});
      const item = new PlaylistItem({});
      const ret = playlist.add(item);

      assert.that(ret).is.sameAs(playlist);

      done();
    });
  });

  describe('Test remove method', () => {
    it('Should be empty after an item was added and removed!', (done) => {
      const playlist = new Playlist({name: 'test'});
      const item = new PlaylistItem({});
      playlist.add(item);
      // Retest add... actually not necessaty because add was already testes...
      assert.that(playlist.count()).is.equalTo(1);

      playlist.remove(item);
      assert.that(playlist.empty()).is.true();

      done();
    });

    it('Must return the same instance of playlist (fluent interface)', (done) => {
      const playlist = new Playlist({name: 'test'});
      const item = new PlaylistItem({});

      // No need to add an item. Remove won't throw an error if the item was not found
      const ret = playlist.remove(item);
      assert.that(ret).is.sameAs(playlist);

      done();
    });
  });

  describe('Test get method', () => {
    it('Must throw an error if item was not found at the given index', (done) => {
      assert.that(() => {
        const playlist = new Playlist({name: 'test'});
        playlist.get(7);
      }).is.throwing(`No item at index 7 found!`);

      done();
    });

    it('Must return the previously added item', (done) => {
      const playlist = new Playlist({name: 'test'});
      const item = new PlaylistItem({});
      playlist.add(item);
      assert.that(playlist.get(0)).is.sameAs(item);

      done();
    });
  });

  describe('Test current method', () => {
    it('Must throw an error if no current item is set', (done) => {
      assert.that(() => {
        const playlist = new Playlist({name: 'test'});
        playlist.current();
      }).is.throwing('No current item set!');

      done();
    });

    it('Must return the first item (default 0) as initial value', (done) => {
      const playlist = new Playlist({name: 'test'});
      const item = new PlaylistItem({});
      playlist.add(item);
      assert.that(playlist.current()).is.sameAs(item);

      done();
    });

    it('CurrentIndex must be 0 after calling first', (done) => {
      const playlist = new Playlist({name: 'test'});
      const item = new PlaylistItem({});
      playlist.add(item);
      assert.that(playlist.currentIndex).is.equalTo(0);

      done();
    });
  });

  describe('Test first method', () => {
    it('Must throw an error if there are no items in this playlist', (done) => {
      assert.that(() => {
        const playlist = new Playlist({name: 'test'});
        playlist.first();
      }).is.throwing('There are no items in playlist with name test');
      done();
    });

    it('Must return the first added item', (done) => {
      const playlist = new Playlist({name: 'test'});
      const item1 = new PlaylistItem({});
      const item2 = new PlaylistItem({});

      playlist.add(item1);
      assert.that(playlist.first()).is.sameAs(item1);

      playlist.add(item2);
      assert.that(playlist.first()).is.sameAs(item1);

      done();
    });
  });

  describe('Test last method', () => {
    it('Must throw an error if there are no items in this playlist', (done) => {
      assert.that(() => {
        const playlist = new Playlist({name: 'test'});
        playlist.last();
      }).is.throwing('There are no items in playlist with name test');
      done();
    });

    it('Must return the last added item', (done) => {
      const playlist = new Playlist({name: 'test'});
      const item1 = new PlaylistItem({});
      const item2 = new PlaylistItem({});

      playlist.add(item1);
      assert.that(playlist.last()).is.sameAs(item1);

      playlist.add(item2);
      assert.that(playlist.last()).is.sameAs(item2);

      done();
    });
  });

  describe('Test next method', () => {
    it('Must throw an error if there are no items in this playlist', (done) => {
      assert.that(() => {
        const playlist = new Playlist({name: 'test'});
        playlist.next();
      }).is.throwing('There are no items in playlist with name test');
      done();
    });

    it('Must return an instance of PlaylistItem', (done) => {
      const playlist = new Playlist({name: 'test'});
      const item1 = new PlaylistItem({});
      const item2 = new PlaylistItem({});

      playlist.add(item1);
      playlist.add(item2);

      assert.that(playlist.next()).is.instanceOf(PlaylistItem);

      done();
    });

    it('Must throw an error if there are no more items left and repeate is not active', (done) => {
      assert.that(() => {
        const playlist = new Playlist({name: 'test'}, {repeat: false});
        const item = new PlaylistItem({});
        playlist.add(item);
        playlist.next();
      }).is.throwing(`No more items in playlist with name test left!`);
      done();
    });

    it('Must return the first item if there are no more items left and repeat is active. currentIndex and previousIndex should be set correctly', (done) => {
      const playlist = new Playlist({name: 'test'}, {repeat: true});
      const item1 = new PlaylistItem({});
      playlist.add(item1);

      assert.that(playlist.next()).is.sameAs(item1);
      assert.that(playlist.currentIndex).is.equalTo(0);
      assert.that(playlist.previousIndex).is.equalTo(0);

      const item2 = new PlaylistItem({});
      playlist.add(item2);
      assert.that(playlist.next()).is.sameAs(item2);
      assert.that(playlist.currentIndex).is.equalTo(1);
      assert.that(playlist.previousIndex).is.equalTo(0);

      assert.that(playlist.next()).is.sameAs(item1);
      assert.that(playlist.currentIndex).is.equalTo(0);
      assert.that(playlist.previousIndex).is.equalTo(1);

      done();
    });
  });

  describe('Test previous method', () => {
    it('Must throw an error if no previous index is set', (done) => {
      assert.that(() => {
        const playlist = new Playlist({name: 'test'}, {repeat: false});
        playlist.previous();
      }).is.throwing(`Playlist with name test has no previous item!`);
      done();
    });

    it('Must return previous item after call next', (done) => {
      const playlist = new Playlist({name: 'test'}, {repeat: false});
      const item1 = new PlaylistItem({});
      const item2 = new PlaylistItem({});

      playlist.add(item1);
      playlist.add(item2);
      playlist.next();

      assert.that(playlist.previous()).is.sameAs(item1);
      assert.that(playlist.currentIndex).is.equalTo(0);
      assert.that(playlist.previousIndex).is.equalTo(1);

      // Previous should now return item2
      assert.that(playlist.previous()).is.sameAs(item2);
      assert.that(playlist.currentIndex).is.equalTo(1);
      assert.that(playlist.previousIndex).is.equalTo(0);

      done();
    });
  });

  describe('Test count method', () => {
    it('Must return the correct item count', (done) => {
      const playlist = new Playlist({name: 'test'}, {repeat: false});
      const item1 = new PlaylistItem({});
      const item2 = new PlaylistItem({});

      assert.that(playlist.count()).is.equalTo(0);

      playlist.add(item1);
      assert.that(playlist.count()).is.equalTo(1);

      playlist.add(item2);
      assert.that(playlist.count()).is.equalTo(2);

      done();
    });
  });

  describe('Test empty method', () => {
    it('Must return true if no items are in this playlist', (done) => {
      const playlist = new Playlist({name: 'test'}, {repeat: false});
      assert.that(playlist.empty()).is.true();

      done();
    });

    it('Must return true if no items are in this playlist', (done) => {
      const playlist = new Playlist({name: 'test'}, {repeat: false});
      const item1 = new PlaylistItem({});

      playlist.add(item1);
      assert.that(playlist.empty()).is.false();
      
      done();
    });
  });
});
