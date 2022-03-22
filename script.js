"use strict";

window.onload = function (e) {
  e = e || window.event;
  var self = this;
  var body = document.getElementsByTagName("body");
  var images = document.getElementsByTagName("img");
  var coords = [];

  for (var i = 0; i < images.length; i++) {
    images[i].addEventListener("mousedown", mouseDown, false);
    var imgCoord = { left: 0, top: 0 };
    var pos = images[i].getBoundingClientRect();
    imgCoord.left = pos.left + window.pageXOffset;
    imgCoord.top = pos.top + window.pageYOffset;
    coords.push(imgCoord);
  }

  for (var i = 0; i < images.length; i++) {
    images[i].style.position = "absolute";
    images[i].style.left = coords[i].left + 'px';
    images[i].style.top = coords[i].top + 'px';
  }

  function mouseDown(e) {
    e = e || window.event;
    var self = this;
    e.preventDefault();
    self.style.cursor = "move";
    var images = document.getElementsByTagName("img");
    for (var image of images) {
      image.style.zIndex = "auto";
    }
    body[0].appendChild(self);
    var imgPos = self.getBoundingClientRect();
    var imgTop = imgPos.y;
    var imgLeft = imgPos.x;
    var deltaX = e.clientX - imgLeft;
    var deltaY = e.clientY - imgTop;
    document.addEventListener("mousemove", mouseMove, false);

    function mouseMove(e) {
      e.preventDefault();
      self.style.left = Math.round(e.pageX - deltaX) + "px";
      self.style.top = Math.round(e.pageY - deltaY) + "px";
    }

    self.addEventListener("mouseup", mouseUp, false);

    function mouseUp(e) {
      e.preventDefault();
      self.style.cursor = 'default';
      document.removeEventListener("mousemove", mouseMove, false);
      self.removeEventListener("mouseup", mouseUp, false);
      
    }
  }
}