export const Dispatcher = {
  _subscribes: {},
  _visitSubscribers(action, type, arg) {
    var pubtype = type || 'any',
      subscribes = this._subscribes[pubtype] || [];

    for (var i = 0, len = subscribes.length; i < len; i += 1) {
      switch (action) {
        case 'publish':
          subscribes[i](arg);
          break;
        case 'unsubscribe':
          if (subscribes[i] === arg) {
            subscribes.splice(i, 1);
          }
          break;
      }
    }
  },
  publish(type, publication) {
    this._visitSubscribers('publish', type, publication);
  },
  unsubscribe(type, fn) {
    this._visitSubscribers('unsubscribe', type, fn);
  },
  subscribe(type, fn) {
    var type = type || 'any';
    if (typeof this._subscribes[type] === 'undefined') {
      this._subscribes[type] = [];
    }
    this._subscribes[type].push(fn);
  }

}