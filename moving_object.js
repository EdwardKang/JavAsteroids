(function(root) {
  if (!(typeof(require) === "undefined")) {
      _ = require('./underscore.js');
    }

  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var MovingObject = Asteroids.MovingObject = function MovingObject(startPos, vel, radius, color) {
    this.pos = startPos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
  };

  MovingObject.prototype.move = function(vel) {
    this.pos[0] += vel[0]
    this.pos[1] += vel[1]
  };

  MovingObject.prototype.draw = function(ctx) {
    var context = canvas.getContext(ctx);
    context.beginPath();
    context.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);
    context.fillStyle = this.color;
    context.fill();
  };

  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var sumRadii = this.radius + otherObject.radius;
    var distance = Math.sqrt(Math.pow((this.pos[0] - otherObject.pos[0]), 2) + Math.pow((this.pos[1] - otherObject.pos[1]), 2));
    if (sumRadii > distance) {
      return true;
    } else {
      return false;
    };
  };

  Function.prototype.inherits = function(obj) {
    function Surrogate() {};
    Surrogate.prototype = obj.prototype;
    this.prototype = new Surrogate();
  };
})(this);