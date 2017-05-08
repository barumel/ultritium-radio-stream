const MediaSource = require('./mediasource');

class MediaSourceFilesystem extends MediaSource {
  constructor() {
    super('filesystem');
  }
}
