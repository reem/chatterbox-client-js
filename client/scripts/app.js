var $ = $;
var _ = _;

var render = (function () {
  // Library of functions that create DOM nodes from
  // our javascript classes.
  var renderMessage = function (messageToRender) {
    return messageToRender.user + ': ' + messageToRender.text;
  };

  var renderUser = function (userToRender) {
    return userToRender.name;
  };

  var renderRoom = function (roomToRender) {
    var $room = $('<ul></ul>');

    $.each(roomToRender.messages, function (ind, messageToRender) {
      $('<li/>').text(renderMessage(messageToRender)).appendTo($room);
    });

    return $room;
  };

  return {
    message: renderMessage,
    user: renderUser,
    room: renderRoom,
  };
}());

var app = (function () {
  // Handles the overall logic and putting stuff on screen


  var init = function () {
    var main = new room.PublicRoom("main");
    setInterval(function () {
      $("#main").find("ul").remove();
      $("#main").append(render.room(main));
    }, 2000);
  };

  return {
    init: init
  };
}());

// Actual entrance point.
app.init();
