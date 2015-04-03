(function($, Observable){
    var sequence = [
	{ symbol: '↑', keyCode: 38, name: 'up' },
	{ symbol: '↑', keyCode: 38, name: 'up' },
	{ symbol: '↓', keyCode: 40, name: 'down' },
	{ symbol: '↓', keyCode: 40, name: 'down' },
	{ symbol: '←', keyCode: 37, name: 'left' },
	{ symbol: '→', keyCode: 39, name: 'right' },
	{ symbol: '←', keyCode: 37, name: 'left' },
	{ symbol: '→', keyCode: 39, name: 'right' },
	{ symbol: 'B', keyCode: 66, name: 'b' },
	{ symbol: 'A', keyCode: 65, name: 'a' }
    ];
    var Code = $.Code = function(){
	Observable.call(this);
	this.index = 0;
    };
    Code.prototype = Object.create(Observable.prototype);
    Code.prototype.constructor = Code;
    Code.prototype.keyListener = function(event){
	if (event.keyCode == sequence[this.index].keyCode) {
	    this.emit('code', sequence[this.index++]);
	} else {
	    this.index = 0;
	    this.emit('reset');
	}
	if (this.index == sequence.length) {
	    this.emit('konami');
	    this.index = 0;
	}
    };
})(window.konami = window.konami || {}, Observable);
