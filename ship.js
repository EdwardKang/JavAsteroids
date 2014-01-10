(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  var Ship = Asteroids.Ship = function Ship(startPos, vel, game, angle) {
    Asteroids.MovingObject.call(this, startPos, vel, Ship.RADIUS, Ship.COLOR, game);
		this.angle = angle;
		this.power = false;
	  this.angularVelocity = 0;
	  this.acceleration = [0, 0]
  };

  Ship.inherits(Asteroids.MovingObject);
  Ship.COLOR = 'red';
  Ship.RADIUS = 5;
	
	Ship.prototype.move = function() {
		if (this.power) {
	    this.acceleration[0] = 0.10 * Math.sin(this.angle);
	    this.acceleration[1] = 0.10 * Math.cos(this.angle);
		} else {
			this.acceleration[0] = 0;
			this.acceleration[1] = 0;
		}
		
		this.vel[0] += this.acceleration[0]
		this.vel[1] += this.acceleration[1]
		
    var speed = Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2));
		
		if (speed === 0) {
			var direction = [0, 0]
		} else {
			var direction = [(this.vel[0] / speed), (this.vel[1] / speed)];
		}
		
		if (speed > 0 && speed - 0.025 < 0) { 
			speed = 0 
		} else if (speed > 0) {
			speed -= 0.025
		}
				
		this.vel = [(direction[0] * speed), (direction[1] * speed)]
		this.angle -= this.angularVelocity
		
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
	}
	
	Ship.prototype.draw = function(ctx) {
	  var shape = [[0,10],[4,-3],[-4,-3]];

	  ctx.restore();
	  ctx.save();
	  ctx.translate(this.pos[0], this.pos[1]);
	  ctx.rotate(-this.angle);

	  ctx.beginPath();
	  ctx.moveTo(shape[0][0],shape[0][1]);
	  ctx.lineTo(shape[1][0],shape[1][1]);
	  ctx.lineTo(shape[2][0],shape[2][1]);
	  ctx.closePath();
	  ctx.strokeStyle = "black";
	  ctx.lineWidth = 1.25;
	  ctx.stroke();

	  ctx.restore();
	}

  Ship.prototype.fireBullet = function() {
    var ship = this;
    var speed = Math.sqrt(Math.pow(ship.vel[0], 2) + Math.pow(ship.vel[1], 2));
    var direction = [Math.sin(this.angle), Math.cos(this.angle)];
    var firingPos = [ship.pos[0] + 6 * Math.sin(ship.angle), ship.pos[1] + 6 * Math.cos(ship.angle)];

    return new Asteroids.Bullet(firingPos, [(5 * direction[0]) + this.vel[0], (5 * direction[1]) + this.vel[1]], ship.game, Date.now())
  };
})(this);