(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  var Asteroid = Asteroids.Asteroid = function Asteroid() {
    Asteroids.MovingObject.call(this, startPos, vel, Asteroid.RADIUS, Asteroid.COLOR)
  };

  Asteroid.inherits(Asteroids.MovingObject);
  Asteroid.COLOR = 'black';
  Asteroid.RADIUS = 3;

  Asteroid.randomAsteroid(dimX, dimY)

})(this);