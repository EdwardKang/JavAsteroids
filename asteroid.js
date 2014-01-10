(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  var Asteroid = Asteroids.Asteroid = function Asteroid(startPos, vel, game) {
    Asteroids.MovingObject.call(this, startPos, vel, Asteroid.RADIUS, Asteroid.COLOR, game)
  };

  Asteroid.inherits(Asteroids.MovingObject);
  Asteroid.COLOR = 'black';
  Asteroid.RADIUS = 10;

  Asteroid.randomAsteroid = function(dimX, dimY, game) {
    var posX = Math.random() * dimX;
    var posY = Math.random() * dimY;
    var startPos = [posX, posY];
    return new Asteroid(startPos, randomVel(), game);
  };

  var randomVel = function() {
    var velX = Math.random() * 4 - 2;
    var velY = Math.random() * 4 - 2;
    return [velX, velY];
  };
})(this);
