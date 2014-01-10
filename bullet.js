(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  var Bullet = Asteroids.Bullet = function Bullet(startPos, vel, game, createdAt) {
    Asteroids.MovingObject.call(this, startPos, vel, Bullet.RADIUS, Bullet.COLOR, game);
		
		this.createdAt = createdAt
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

  Bullet.prototype.move = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    if (this.pos[0] < 0) {
      this.pos[0] = Asteroids.Game.DIM_X;
    } else if (this.pos[0] > Asteroids.Game.DIM_X) {
      this.pos[0] = 0;
    } else if (this.pos[1] < 0) {
      this.pos[1] = Asteroids.Game.DIM_Y;
    } else if (this.pos[1] > Asteroids.Game.DIM_Y) {
      this.pos[1] = 0;
    }
		
		if (Date.now() - this.createdAt > 1000) {
			this.game.removeBullet(this);
		}

    this.hitAsteroids();
  };
})(this);