export const UserEventHandler = class UserEventHandler {
  constructor(type, handler, options) {
    this._type = type;
    this._handler = handler;
    this._options = options;
  }

  register(target = document) {
    target.addEventListener(this._type, this._handler, this._options);
  }

  unregister(target = document) {
    target.removeEventListener(this._type, this._handler, this._options);
  }
};

export default UserEventHandler;
