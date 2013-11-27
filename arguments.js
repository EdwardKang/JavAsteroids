var sum = function() {
  var total = 0;
  for (var i = 0; i < arguments.length; i++) {
    total += arguments[i];
  };

  return total;
};

// console.log(sum(1,2,3,4));

Function.prototype.myBind = function(obj) {
  var func = this;
  var args = Array.prototype.slice.call(arguments, 1);

  return function() {
    var newArgs = Array.prototype.slice.call(arguments);
    func.apply(obj, args.concat(newArgs));
  };
};

obj = {
  name: "Earl Watts",
  color: "Brown",

};

var cat = function(color) {
  console.log(this[color]);
}

// cat.bind(obj, "name")();

function curriedSum(numArgs) {
  var numbers = [];

  function _curriedSum(number) {
    numbers.push(number);

    if (numbers.length === numArgs) {
      var sum = 0;
      numbers.forEach(function(num) { sum += num; });
      return sum;
    } else {
      return _curriedSum;
    }
  };
  return _curriedSum;
};

// var sum = curriedSum(4);
// console.log(sum(5)(30)(20)(1));

Function.prototype.curry = function(numArgs) {
  var numbers = [];
  var func = this;

  function _curriedSum(number) {
    numbers.push(number);

    if (numbers.length === numArgs) {
      return func.apply(null, numbers);
    } else {
      return _curriedSum;
    }
  };
  return _curriedSum;
};

var addNums = function(a,b) {
  return a + b;
};

var sum = addNums.curry(2);
console.log(sum(5)(39));
