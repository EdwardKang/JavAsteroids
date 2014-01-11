(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  var Asteroid = Asteroids.Asteroid = function Asteroid(startPos, vel, radius, game) {
    Asteroids.MovingObject.call(this, startPos, vel, radius, Asteroid.COLOR, game)
  };

  Asteroid.inherits(Asteroids.MovingObject);
  Asteroid.COLOR = 'black';
  Asteroid.RADIUS = 10;

  Asteroid.randomAsteroid = function(dimX, dimY, radius, game) {
    var posX = Math.random() * dimX;
    var posY = Math.random() * dimY;
    var startPos = [posX, posY];
    return new Asteroid(startPos, randomVel(), radius, game);
  };
	
	Asteroid.placedAsteroid = function(startX, startY, radius, startVel, game) {
		var startPos = [startX, startY];
		var tempVel = randomVel();
		var newVel = [(startVel[0] + tempVel[0]), (startVel[1] + tempVel[1])]
		return new Asteroid(startPos, newVel, radius, game);
	};

  var randomVel = function() {
    var velX = Math.random() * 2 - 1;
    var velY = Math.random() * 2 - 1;
    return [velX, velY];
  };
})(this);
