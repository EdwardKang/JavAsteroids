(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  var Bullet = Asteroids.Bullet = function Bullet(startPos, vel) {
    Asteroids.MovingObject.call(this, startPos, vel, Bullet.RADIUS, Bullet.COLOR);
  };

  Bullet.inherits(Asteroids.MovingObject);
  Bullet.COLOR = 'blue';
  Bullet.RADIUS = 2;

  Function.prototype.inherits = function(obj) {
    function Surrogate() {};
    Surrogate.prototype = obj.prototype;
    this.prototype = new Surrogate();
  };
})(this);