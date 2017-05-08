class MediaStreamRadio {
  constructor() {

  }

  /**
   * Return a random item of the given playlist
   *
   * @return PlaylistItem item Next item in playlist
   */
  getNext() {
    const index = Math.floor((Math.random() * this.playlist.count()));

    return this.playlist.get(index);
  }
}
