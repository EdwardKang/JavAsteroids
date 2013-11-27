(function(root) {

  var Asteroids = root.Asteroids = (root.Asteroids || {});
  var Game = Asteroids.Game = function Game(ctx) {
    this.ctx = ctx;
    this.timerId = null;
    this.asteroids = this.addAsteroids(10);
    this.ship = new Asteroids.Ship([(Game.DIM_X / 2), (Game.DIM_Y / 2)], [0,0], this);
    this.bullets = [];
    this.background;
    this.astImg;
  };

  Game.DIM_X = 800;
  Game.DIM_Y = 600;
  Game.FPS = 30;

  Game.prototype.addAsteroids = function(num) {
    var asteroids = [];

    _.times(num, function() {
      asteroids.push(Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y, this));
    });
    return asteroids;
  };

  Game.prototype.draw = function() {
    var game = this;

    game.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    ctx.drawImage(this.background, 0, 0);

    _.each(game.asteroids, function(asteroid) {
      asteroid.draw(game.ctx, game.astImg);
    });

    this.ship.draw(game.ctx);

    _.each(game.bullets, function(bullet) {
      bullet.draw(game.ctx);
    });
  };

  Game.prototype.move = function() {
    _.each(this.asteroids, function(asteroid) {
      asteroid.move(asteroid.vel);
    });

    this.ship.move(this.ship.vel);

    _.each(this.bullets, function(bullet) {
      bullet.move(bullet.vel);
    });
  };

  Game.prototype.step = function() {
    this.move();
    this.draw();
    this.checkCollisions();
  };

  Game.prototype.start = function() {
    var game = this;
    game.bindKeyHandlers();

    var img = new Image();
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
    };
    this.background = img;
    img.src = 'stars.jpg';

    var dolan = new Image();
    dolan.onload = function () {
      ctx.drawImage(dolan, 0, 0);
    };
    this.astImg = dolan;
    dolan.src = 'dolanhead.png';

    game.timerId = window.setInterval(function() {
      game.step();
    }, Game.FPS);
  };

  Game.prototype.checkCollisions = function() {
    var game = this;

    _.each(game.asteroids, function(asteroid) {
      if (asteroid.isCollidedWith(game.ship)) {
        game.stop();
      }
    });
  };

  Game.prototype.removeAsteroid = function(hitAsteroid) {
    var game = this;

    _.each(game.asteroids, function(asteroid, idx) {
      if (hitAsteroid === asteroid) {
        game.asteroids[idx] = false;
      }
    });
    game.asteroids = _.compact(game.asteroids);
  };

  Game.prototype.removeBullet = function(usedBullet) {
    var game = this;

    _.each(game.bullets, function(bullet, idx) {
      if (usedBullet === bullet) {
        game.bullets[idx] = false;
      }
    });
    game.bullets = _.compact(game.bullets);
  };

  Game.prototype.stop = function() {
    window.clearInterval(this.timerId);
    alert("GAME OVER!");
  };

  Game.prototype.bindKeyHandlers = function() {
    var game = this;

    key('up', function() { game.ship.power([0,-.25]); });
    key('down', function() { game.ship.power([0,.25]); });
    key('left', function() { game.ship.power([-.25,0]); });
    key('right', function() { game.ship.power([.25,0]); });
    key('space', function() { game.fireBullet(); });
  };

  Game.prototype.fireBullet = function() {
    this.bullets.push(this.ship.fireBullet());
  };

  Function.prototype.inherits = function(obj) {
    function Surrogate() {};
    Surrogate.prototype = obj.prototype;
    this.prototype = new Surrogate();
  };
})(this);