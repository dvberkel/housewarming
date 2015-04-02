(function($){
    var Position = function(x, y){
	this.x = x || 0;
	this.y = y || 0;
    };

    var Couple = $.Couple = function(x, y){
	Position.call(this, x, y);
    };
    Couple.prototype = Object.create(Position.prototype);
    Couple.prototype.constructor = Couple;

    var House = $.House = function(x, y){
	Position.call(this, x, y);
    };
    House.prototype = Object.create(Position.prototype);
    House.prototype.constructor = Couple;

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

    var HouseView = function(house, context){
	this.house = house;
	this.context = context;
	this.update();
    };
    HouseView.prototype.update = function(){
	this.context.save();
	this.context.fillStyle = 'green';
	this.context.fillRect(this.house.x, this.house.y, 20, 20);
	this.context.restore();
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


    var View = $.View = function(couple, house, canvas){
	this.couple = couple;
	this.house = house;
	this.canvas = canvas;
	this.context = this.canvas.getContext('2d');
	this.scenes = [
	    new BackgroundView(this.canvas, this.context),
	    new HouseView(house, this.context),
	    new CoupleView(couple, this.context),
	]
	this.update();
    };
    View.prototype.update = function(){
	this.scenes.forEach(function(scene){
	    scene.update();
	});
    };
})(window.housewarming = window.housewarming || {});
