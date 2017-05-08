class MediaSource {
  constructor(name, config = {}) {
    if (_.isUndefined(name) || !_.isString(name)) {
      throw new Error('A mediasource must have a name!');
    }

    this.name = name;
    this.config = config;
  }

  authenticate() {

  }

  get(id) {

  }

  getName() {
    return this.name;
  }
}
