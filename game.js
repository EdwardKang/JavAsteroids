(function(root) {
  if (!(typeof(require) === "undefined")) {
      _ = require('./underscore.js');
    }

  var Asteroids = root.Asteroids = (root.Asteroids || {});
  var Game = Asteroids.Game = function Game(ctx) {
    this.ctx = ctx;
    this.asteroids = this.addAsteroids(10);
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
  };

  Game.prototype.move = function() {
    var game = this;

    _.each(game.asteroids, function(asteroid) {
      asteroid.move(asteroid.vel);
    });
  };

  Game.prototype.step = function() {
    this.move();
    this.draw();
  };

  Game.prototype.start = function() {
    var game = this;

    window.setInterval(function() {
      game.step();
    }, Game.FPS);
  };

  Function.prototype.inherits = function(obj) {
    function Surrogate() {};
    Surrogate.prototype = obj.prototype;
    this.prototype = new Surrogate();
  };

})(this);