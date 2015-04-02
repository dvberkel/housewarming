(function(document, housewarming){
    var playground = document.getElementById('playground');
    playground.width = document.body.clientWidth;
    playground.height = document.body.clientHeight;

    var game = new housewarming.Game();
    new housewarming.View(game, playground, {
	house: {
	    size: 20,
	    color: 'green',
	    featuresColor: 'brown'
	}
    });

    function mousemoveHandler(event){
	game.couple.placeAt(event.x, event.y);
    }
    document.body.addEventListener('mousemove', mousemoveHandler);
    game.on('finished', function(){
	document.body.removeEventListener('mousemove', mousemoveHandler);
	var p = document.createElement('p');
	p.innerHTML = 'Congratulations';
	p.setAttribute('class', 'winning');
	document.body.appendChild(p);
    })
})(document, housewarming);
