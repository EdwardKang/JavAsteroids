(function(root) {

  var Asteroids = root.Asteroids = (root.Asteroids || {});
  var Game = Asteroids.Game = function(ctx) {
    this.ctx = ctx;
    this.timerId = null;
    this.asteroids = this.addAsteroids(10);
    this.ship = new Asteroids.Ship([(Game.DIM_X / 2), (Game.DIM_Y / 2)], [0,0], this, Math.PI);
    this.bullets = [];
		this.fireBullet = false;
		this.lastCreatedBullet = 0;
		this.gameOver = false;
  };

  Game.DIM_X = 600;
  Game.DIM_Y = 600;
  Game.FPS = 15;

  Game.prototype.addAsteroids = function(num) {
    var asteroids = [];

    _.times(num, function() {
      asteroids.push(Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y, this));
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
      bullet.draw(game.ctx);
    });
  };

  Game.prototype.move = function() {
    _.each(this.asteroids, function(asteroid) {
      asteroid.move();
    });

    this.ship.move();

    _.each(this.bullets, function(bullet) {
      bullet.move();
    });
  };

  Game.prototype.step = function() {
		this.fire(this.fireBullet);	
    this.move();
    this.draw();
    this.checkCollisions();
		
		var that = this;
		
		key('space', function(){ 
			if (that.gameOver) {
		    that.timerId = null;
		    that.asteroids = that.addAsteroids(10);
		    that.ship = new Asteroids.Ship([(Game.DIM_X / 2), (Game.DIM_Y / 2)], [0,0], that, Math.PI);
		    that.bullets = [];
				that.fireBullet = false;
				that.lastCreatedBullet = 0;
				that.gameOver = false;
				
				that.start();
			}
		});
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
		ctx.fillStyle = "black";
		ctx.font = "20pt Arial";
		ctx.fillText("GAMEOVER", 222.5,250);
		ctx.font = "10pt Arial";
		ctx.fillText("press space to continue", 230,265)
		this.gameOver = true;
  };

  Game.prototype.bindKeyHandlers = function() {
    var game = this;
    
	  key('left', function(){ game.ship.angularVelocity = -(Math.PI/30) });
	  key('right', function(){ game.ship.angularVelocity = (Math.PI/30) });
	  key('up', function(){ game.ship.power = true });
    key('space', function() { game.fireBullet = true; });
		

	  keyup('right', function(){ game.ship.angularVelocity = 0 });
	  keyup('left', function(){ game.ship.angularVelocity = 0 });
	  keyup('up', function(){ game.ship.power = false });
		keyup('space', function() { game.fireBullet = false; });
  };

  Game.prototype.fire = function(isShooting) {
		if (isShooting == true && (Date.now() - this.lastCreatedBullet > 100 )) {
	    this.bullets.push(this.ship.fireBullet());
			this.lastCreatedBullet = Date.now()
		}
  };
})(this);