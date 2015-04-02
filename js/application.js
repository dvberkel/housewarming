(function(document, housewarming){
    var playground = document.getElementById('playground');
    playground.width = document.body.clientWidth;
    playground.height = document.body.clientHeight;

    var game = new housewarming.Game();
    new housewarming.View(game, playground);

    function mousemoveHandler(event){
	game.couple.placeAt(event.x, event.y);
    }
    document.body.addEventListener('mousemove', mousemoveHandler);
    game.on('finished', function(){
	document.body.removeEventListener('mousemove', mousemoveHandler);
	console.log('finished');
    })
})(document, housewarming);
