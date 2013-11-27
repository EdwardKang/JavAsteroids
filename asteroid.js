(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  var Asteroid = Asteroids.Asteroid = function Asteroid(startPos, vel, game) {
    Asteroids.MovingObject.call(this, startPos, vel, Asteroid.RADIUS, Asteroid.COLOR, game)
  };

  Asteroid.inherits(Asteroids.MovingObject);
  Asteroid.COLOR = 'black';
  Asteroid.RADIUS = 25;

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

  Asteroid.prototype.draw = function(ctx  ,   img) {
    var pat1 = ctx.createPattern(img, 'repeat')

    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = pat1;
    ctx.fill();
    ctx.closePath();
  };

  Function.prototype.inherits = function(obj) {
    function Surrogate() {};
    Surrogate.prototype = obj.prototype;
    this.prototype = new Surrogate();
  };
})(this);
