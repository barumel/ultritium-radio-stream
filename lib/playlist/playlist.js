const PlaylistItem = require('./item');

class Playlist {
  constructor(name, items = []) {
    this.name = name;
    this.items = items;
  }

  /**
   * Add an item to the playlist
   *
   * @param PlaylistItem item Playlist item
   *
   * @return Playlist this This instance
   */
  add(item) {
    if (!(item instanceof Playlist)) {
      throw new Error('A playlist item must be an instance of PlaylistItem!');
    }

    this.items.push(item);

    return this;
  }

  /**
   * Remove an item from the playlist
   *
   * @param String id Id of the item
   *
   * @return Playlist this This instance
   */
  remove(id) {
    const index = _.findIndex(this.items, { id: id });

    if (index !== -1) {
      this.items.splice(index, 1);
    }

    return this;
  }

  /**
   * Ge the next item in playlist
   *
   * @return PlaylistItem item Next item in playlist
   */
  next() {
    const index = Math.floor((Math.random() * this.items.length));

    return this.items[index];
  }
}
