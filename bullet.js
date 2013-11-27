(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  var Bullet = Asteroids.Bullet = function Bullet(startPos, vel, game) {
    Asteroids.MovingObject.call(this, startPos, vel, Bullet.RADIUS, Bullet.COLOR, game);
  };

  Bullet.inherits(Asteroids.MovingObject);
  Bullet.COLOR = 'blue';
  Bullet.RADIUS = 2;

  Bullet.prototype.hitAsteroids = function() {
    var bullet = this;

    _.each(bullet.game.asteroids, function(asteroid) {
      if (asteroid.isCollidedWith(bullet)) {
        bullet.game.removeAsteroid(asteroid);
        bullet.game.removeBullet(bullet);
      }
    });
  };

  Bullet.prototype.move = function(vel) {
    this.pos[0] += vel[0];
    this.pos[1] += vel[1];

    this.hitAsteroids();
  };

  Function.prototype.inherits = function(obj) {
    function Surrogate() {};
    Surrogate.prototype = obj.prototype;
    this.prototype = new Surrogate();
  };
})(this);