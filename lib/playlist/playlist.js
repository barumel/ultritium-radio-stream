const PlaylistItem = require('./item');

class Playlist {
  constructor(name, items = []) {
    this.name = name;
    this.items = items;
    this.current = -1;
  }

  /**
   * Add an item to the playlist
   *
   * @param PlaylistItem item Playlist item
   *
   * @return Playlist this This instance
   */
  add(item) {
    if (!(item instanceof PlaylistItem)) {
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
   * Get the given item from the playlist
   *
   * @param Number id ID ot the playlist item
   *
   * @return PlaylistItem item Playlist item
   */
  get(id) {
    this.current = id;

    return this.items[id];
  }

  /**
   * Get the first item of the playlist
   *
   * @return PlaylistItem item Playlist item
   */
  first() {
    if (this.items.length <= 0) {
      throw new Error('There are no items in {this.name}');
    }

    return this.items[0];
  }

  /**
   * Get the last item of the playlist
   *
   * @return PlaylistItem item Playlist item
   */
  last() {
    if (this.items.length <= 0) {
      throw new Error('There are no items in {this.name}');
    }

    return this.items[his.items.length -1];
  }

  /**
   * Ge the next item in playlist
   *
   * @return PlaylistItem item Next item in playlist
   */
  next() {
    if (this.items.length <= 0) {
      throw new Error('There are no items in {this.name}');
    }

    // Reset the playlist if no items are left (Restart from beginning)
    if (_.isUndefined(this.items[this.current +1])) this.current = 0;

    return this.items[this.current + 1]
  }

  /**
   * Ge the previous item in playlist
   *
   * @return PlaylistItem item Previous item in playlist
   */
  previous() {
    if (this.current <= 0) {
      throw new Error('No items left in playlist!');
    }

    return this.items[this.current - 1];
  }

  /**
   * Get the total count of the playlist
   *
   * @return Integer length Playlist length
   */
  count() {
    return this.items.length;
  }
}

module.exports = Playlist;
