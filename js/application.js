(function(document, housewarming){
    var playground = document.getElementById('playground');
    playground.width = document.body.clientWidth;
    playground.height = document.body.clientHeight;

    var game = new housewarming.Game();
    new housewarming.View(game, playground);

    document.body.addEventListener('mousemove', function(event){
	game.couple.placeAt(event.x, event.y);
    })
})(document, housewarming);
