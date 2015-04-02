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
	var args = Array.prototype.slice.call(arguments, 1);
	(this.observers[event] || []).forEach(function(observer){
	    observer.apply(observer, args);
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
	var oldX = this.x;
	var oldY = this.y;
	this.x = x;
	this.y = y;
	this.emit('position-changed', x, y, oldX, oldY);
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
	this.options = extend(options || {},
			 { distance: 10 },
			 { couple: { x: 200, y: 200} },
			 { house: { x: 100, y: 100} });
	Observable.call(this);
	this.couple = new Couple(this.options.couple.x, this.options.couple.y);
	this.house = new House(this.options.house.x, this.options.house.y);
	this.couple.on('position-changed', this.isFinished.bind(this));
    };
    Game.prototype = Object.create(Observable.prototype);
    Game.prototype.constructor = Game;
    Game.prototype.isFinished = function(){
	if (distance(this.couple, this.house) < this.options.distance) {
	    this.emit('finished');
	}
    };

    var CoupleView = function(couple, context, options){
	this.options = extend(options || {}, { src: 'image/robin-marloes-small.jpg' });
	this.couple = couple;
	this.context = context;
	this.initialize();
    };
    CoupleView.prototype.initialize = function(){
	var image = this.image = new Image();
	this.image.src = this.options.src;
	this.image.addEventListener('load', this.update.bind(this), false);
    };
    CoupleView.prototype.update = function(){
	this.context.save();
	this.context.drawImage(this.image,
			       this.couple.x - this.image.width/2,
			       this.couple.y - this.image.height/2);
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
    };
    function drawDoor(context, x, y, size, color){
	context.save();
	context.fillStyle = color;
	context.beginPath()
	context.moveTo(x + size/2, y + size);
	context.lineTo(x + size/2, y);
	context.lineTo(x, y);
	context.lineTo(x, y + size);
	context.closePath();
	context.fill();
    };
    function drawWindows(context, x, y, size, color){
	context.save();
	context.fillStyle = color;
	context.beginPath()
	context.moveTo(x + 3*size/4, y - size/4);
	context.lineTo(x + 3*size/4, y - 3*size/4);
	context.lineTo(x + size/4, y - 3*size/4);
	context.lineTo(x + size/4, y - size/4);
	context.closePath();
	context.moveTo(x - 3*size/4, y - size/4);
	context.lineTo(x - 3*size/4, y - 3*size/4);
	context.lineTo(x - size/4, y - 3*size/4);
	context.lineTo(x - size/4, y - size/4);
	context.closePath();
	context.fill();
    };

    var HouseView = function(house, context, options){
	this.options = extend(options || {},
			      { size: 20 },
			      { color: 'green'},
			      { featuresColor: 'brown'});
	this.house = house;
	this.context = context;
	this.update();
    };
    HouseView.prototype.update = function(){
	var x = this.house.x, y = this.house.y, size = this.options.size;
	drawHouse(this.context, x, y, size, this.options.color);
	drawDoor(this.context, x, y, size, this.options.featuresColor);
	drawWindows(this.context, x, y, size, this.options.featuresColor);
    };


    var BackgroundView = function(canvas, context, options){
	this.options = extend(options || {}, {color : 'rgba(0,0,0,0.1)' });
	this.canvas = canvas;
	this.context = context;
	this.update();
    };
    BackgroundView.prototype.update = function(){
	this.context.save();
	this.context.fillStyle = this.options.color;
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
	this.context.restore();
    }

    var View = $.View = function(game, canvas, options){
	this.game = game;
	this.canvas = canvas;
	this.context = this.canvas.getContext('2d');
	this.scenes = [
	    new BackgroundView(this.canvas, this.context, options.background),
	    new HouseView(this.game.house, this.context, options.house),
	    new CoupleView(this.game.couple, this.context, options.couple),
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
