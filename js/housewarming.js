(function($){
    var View = $.View = function(canvas){
	this.canvas = canvas;
	this.context = this.canvas.getContext('2d');
	this.update();
    };
    View.prototype.update = function(){
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	this.context.fillStyle = 'rgba(0,0,0,0.1)';
	this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    };
})(window.housewarming = window.housewarming || {});
