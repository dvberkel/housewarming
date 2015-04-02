(function($){
    var House = $.House = function(x, y){
	this.x = x || 0;
	this.y = y || 0;
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
    }

    var View = $.View = function(house, canvas){
	this.house = house;
	this.canvas = canvas;
	this.context = this.canvas.getContext('2d');
	this.scenes = [
	    new HouseView(house, this.context)
	]
	this.update();
    };
    View.prototype.update = function(){
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	this.context.fillStyle = 'rgba(0,0,0,0.1)';
	this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
	this.scenes.forEach(function(scene){
	    scene.update();
	});
    };
})(window.housewarming = window.housewarming || {});
