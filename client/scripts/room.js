var room = (function () {

  var Room = function (name) {
    this.name = name;
    this.messages = [];
    this.currentUsers = []; // Perhaps
  };

  Room.prototype.postMessage = function (message) {
    this.messages.push(message);
  };

  Room.prototype.addUser = function(user) {
    this.currentUsers.push(user);
  };

  Room.prototype.removeUser = function(user) {
    var indexOfUser = this.currentUsers.indexOf(user);
    if (indexOfUser !== -1) {
      this.currentUsers.splice(indexOfUser, 1);
    }
  };

  var PrivateRoom = function (name, allowedUsers) {
    Room.call(this, name);
    this._allowedUsers = allowedUsers;
  };

  PrivateRoom.prototype = Object.create(Room.prototype);
  PrivateRoom.prototype.constructor = PrivateRoom;

  PrivateRoom.prototype.addUser = function (user) {
    var indexOfUser = this._allowedUsers.indexOf(user);
    if (indexOfUser !== -1) {
      Room.prototype.addUser.call(this, user);
    } else {
      throw new Error("Private Room: " + user.name + " is not allowed in this room");
    }
  };

  var PublicRoom = function (name) {
    Room.call(this, name);
    PublicRoom.all[this.name] = this;
  };

  PublicRoom.all = {}; // Name of Room -> Room

  PublicRoom.prototype = Object.create(Room.prototype);
  PublicRoom.prototype.constructor = PublicRoom;

  PublicRoom.prototype.delete = function () {
    delete PublicRoom.all[this.name];
  };

  return {
    PrivateRoom: PrivateRoom,
    PublicRoom: PublicRoom
  };
}());
