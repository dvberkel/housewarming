(function($){
    var Observable = $.Observable = function(){
        this.observers = {};
    };
    Observable.prototype.on = function(event, observer){
        (this.observers[event] = this.observers[event] || []).push(observer);
    };
    Observable.prototype.off = function(event, observer){
        this.observers[event] = (this.observers[event] || []).filter(function(o){
            return o != observer;
        });
    };
    Observable.prototype.emit = function(event){
        var args = Array.prototype.slice.call(arguments, 1);
        (this.observers[event] || []).forEach(function(observer){
            observer.apply(observer, args);
        });
    };
})(window);
