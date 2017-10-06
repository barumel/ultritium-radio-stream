const PlaylistItem = require('./Item');
const _ = require('lodash');

class Playlist {
  constructor(data, options = {}) {
    _.assign(this, data);
    this.options = options;
    this.items = [];
    this.currentIndex = 0;
    this.previousIndex;
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
  get(index) {
    if (_.isUndefined(this.items[index])) throw new Error(`No item at index ${index} found!`);

    return this.items[index];
  }

  /**
   * Get the current items
   *
   * @return {PlaylistItem} current Current item
   */
  current() {
    const { items, currentIndex } = this;
    if (_.isUndefined(items[currentIndex])) throw new Error('No current item set!');

    return items[currentIndex];
  }

  /**
   * Get the first item of the playlist
   *
   * @return PlaylistItem item Playlist item
   */
  first() {
    if (this.items.length <= 0) throw new Error(`There are no items in playlist with name ${this.name}`);

    // Set current / previous
    this.previousIndex = this.currentIndex;
    this.currentIndex = 0;

    return this.items[0];
  }

  /**
   * Get the last item of the playlist
   *
   * @return PlaylistItem item Playlist item
   */
  last() {
    if (this.items.length <= 0)  throw new Error(`There are no items in playlist with name ${this.name}`);


    return this.items[this.count() -1];
  }

  /**
   * Ge the next item in playlist
   *
   * @return PlaylistItem item Next item in playlist
   */
  next() {
    if (this.items.length <= 0) throw new Error(`There are no items in playlist with name ${this.name}`);
    const { currentIndex, items } = this;
    let nextIndex = currentIndex + 1;

    if (_.isUndefined(items[nextIndex]) && this.options.repeat) nextIndex = 0;
    const item = items[nextIndex];

    if (_.isUndefined(item)) throw new Error(`No more items in playlist with name ${this.name} left!`);

    // Set previous and current index
    this.previousIndex = this.currentIndex;
    this.currentIndex = nextIndex;

    return item;
  }

  /**
   * Return a random item from playlist
   *
   * @return {[type]} [description]
   */
  random() {

  }

  /**
   * Ge the previous item in playlist
   *
   * @return PlaylistItem item Previous item in playlist
   */
  previous() {
    const { previousIndex, currentIndex, items } = this;
    if (_.isUndefined(previousIndex)) throw new Error(`Playlist with name ${this.name} has no previous item!`);
    const item = items[previousIndex];

    this.currentIndex = previousIndex;
    this.previousIndex = currentIndex;

    return item;
  }

  /**
   * Get the total count of the playlist
   *
   * @return Integer length Playlist length
   */
  count() {
    return this.items.length;
  }

  /**
   * Check whether the playlist is empty or not
   *
   * @return {Boolean}
   */
  empty() {
    return this.count() > 0;
  }
}

module.exports = Playlist;
