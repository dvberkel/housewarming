(function($){
    var distance = function(u, v){
	return Math.abs(u.x - v.x) + Math.abs(u.y - v.y);
    };

    var extend = function(){
	var result = {};
	var args = Array.prototype.slice.call(arguments).forEach(function(data){
	    for (var key in data){
		if (result[key] == undefined) {
		    result[key] = data[key];
		}
	    }
	});
	return result;
    };

    var Observable = function(){
	this.observers = {};
    };
    Observable.prototype.on = function(event, observer){
	(this.observers[event] = this.observers[event] || []).push(observer);
    };
    Observable.prototype.emit = function(event){
	var args = Array.prototype.slice(arguments, 1);
	(this.observers[event] || []).forEach(function(observer){
	    observer(args);
	});
    };

    var Position = function(x, y){
	Observable.call(this);
	this.x = x || 0;
	this.y = y || 0;
    };
    Position.prototype = Object.create(Observable.prototype);
    Position.prototype.constructor = Position;
    Position.prototype.placeAt = function(x, y){
	this.x = x;
	this.y = y;
	this.emit('position-changed');
    };

    var Couple = function(x, y){
	Position.call(this, x, y);
    };
    Couple.prototype = Object.create(Position.prototype);
    Couple.prototype.constructor = Couple;

    var House = function(x, y){
	Position.call(this, x, y);
    };
    House.prototype = Object.create(Position.prototype);
    House.prototype.constructor = Couple;

    var Game = $.Game = function(options){
	options = extend(options || {},
			 {coupleX: 200, coupleY: 200},
			 {houseX: 100, houseY: 100});
	Observable.call(this);
	this.couple = new Couple(options.coupleX, options.coupleY);
	this.house = new House(options.houseX, options.houseY);
	this.couple.on('position-changed', this.isFinished.bind(this));
    };
    Game.prototype = Object.create(Observable.prototype);
    Game.prototype.constructor = Game;
    Game.prototype.isFinished = function(){
	if (distance(this.couple, this.house) < 10) {
	    this.emit('finished');
	}
    };

    var CoupleView = function(couple, context){
	this.couple = couple;
	this.context = context;
	this.update();
    };
    CoupleView.prototype.update = function(){
	this.context.save();
	this.context.fillStyle = 'red';
	this.context.fillRect(this.couple.x, this.couple.y, 5, 5);
	this.context.restore();
    };

    function drawHouse(context, x, y, size, color){
	context.save();
	context.fillStyle = color;
	context.beginPath()
	context.moveTo(x + size, y + size);
	context.lineTo(x + size, y - size);
	context.lineTo(x, y - 2 * size);
	context.lineTo(x - size, y - size);
	context.lineTo(x - size, y + size);
	context.closePath();
	context.fill();
    }

    var HouseView = function(house, context, options){
	this.options = extend(options || {}, { houseSize: 20 }, { houseColor: 'green'});
	this.house = house;
	this.context = context;
	this.update();
    };
    HouseView.prototype.update = function(){
	var x = this.house.x, y = this.house.y, size = this.options.houseSize;
	drawHouse(context, x, y, size, this.options.houseColor);
    };


    var BackgroundView = function(canvas, context){
	this.canvas = canvas;
	this.context = context;
	this.update();
    };
    BackgroundView.prototype.update = function(){
	this.context.save();
	this.context.fillStyle = 'rgba(0,0,0,0.1)';
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
	this.context.restore();
    }

    var View = $.View = function(game, canvas){
	this.game = game;
	this.canvas = canvas;
	this.context = this.canvas.getContext('2d');
	this.scenes = [
	    new BackgroundView(this.canvas, this.context),
	    new HouseView(this.game.house, this.context),
	    new CoupleView(this.game.couple, this.context),
	]
	this.game.couple.on('position-changed', this.update.bind(this));
	this.update();
    };
    View.prototype.update = function(){
	this.scenes.forEach(function(scene){
	    scene.update();
	});
    };
})(window.housewarming = window.housewarming || {});
