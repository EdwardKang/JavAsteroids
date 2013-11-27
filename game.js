(function(root) {
  if (!(typeof(require) === "undefined")) {
      _ = require('./underscore.js');
    }

  var Asteroids = root.Asteroids = (root.Asteroids || {});
  var Game = Asteroids.Game = function Game(ctx) {
    this.ctx = ctx;
    this.timerId = null;
    this.asteroids = this.addAsteroids(10);
    this.ship = new Asteroids.Ship([(Game.DIM_X / 2), (Game.DIM_Y / 2)], [0,0]);
    this.bullets = [];
  };

  Game.DIM_X = 800;
  Game.DIM_Y = 600;
  Game.FPS = 30;

  Game.prototype.addAsteroids = function(num) {
    var asteroids = [];

    _.times(num, function() {
      asteroids.push(Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y));
    });
    return asteroids;
  };

  Game.prototype.draw = function() {
    var game = this;

    game.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y)

    _.each(game.asteroids, function(asteroid) {
      asteroid.draw(game.ctx);
    });

    this.ship.draw(game.ctx);

    _.each(game.bullets, function(bullet) {
      console.log("DRAWING BULLET");
      bullet.draw(game.ctx);
      console.log(bullet.color);
      console.log(bullet.radius);
      console.log(bullet.pos);
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
    this.removeAsteroids();
  };

  Game.prototype.start = function() {
    var game = this;
    game.bindKeyHandlers();

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

  Game.prototype.removeAsteroids = function() {
    var game = this;

    _.each(game.asteroids, function(asteroid, idx) {
      if ((asteroid.pos[0] < 0 || asteroid.pos[0] > Game.DIM_X) || (asteroid.pos[1] < 0 || asteroid.pos[1] > Game.DIM_Y)) {
        game.asteroids[idx] = game.addAsteroids(1)[0];
      }
    });
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
    console.log("JUST FIRED");
  };

  Function.prototype.inherits = function(obj) {
    function Surrogate() {};
    Surrogate.prototype = obj.prototype;
    this.prototype = new Surrogate();
  };
})(this);