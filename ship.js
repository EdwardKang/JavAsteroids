(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  var Ship = Asteroids.Ship = function Ship(startPos, vel) {
    Asteroids.MovingObject.call(this, startPos, vel, Ship.RADIUS, Ship.COLOR);
  };

  Ship.inherits(Asteroids.MovingObject);
  Ship.COLOR = 'red';
  Ship.RADIUS = 5;

  Function.prototype.inherits = function(obj) {
    function Surrogate() {};
    Surrogate.prototype = obj.prototype;
    this.prototype = new Surrogate();
  };

  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.fireBullet = function() {
    var ship = this;
    var speed = Math.sqrt(Math.pow(ship.vel[0], 2) + Math.pow(ship.vel[1], 2));
    var direction = [(ship.vel[0] / speed), (ship.vel[1] / speed)];
    var firingPos = [ship.pos[0], ship.pos[1]];
    console.log("FIRING POS: " + firingPos);
    console.log('VEL: ' + [(10 * direction[0]), (10 * direction[1])]);

    if (ship.vel !== [0,0]) {
      console.log("FIRING");
      return new Asteroids.Bullet(firingPos, [(5 * direction[0]), (5 * direction[1])])
    }
  };
})(this);