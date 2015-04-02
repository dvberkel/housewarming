(function(document, housewarming){
    var playground = document.getElementById('playground');
    playground.width = document.body.clientWidth;
    playground.height = document.body.clientHeight;

    var options = {
	houseX: 100, houseY: 100,
	coupleX: 200, coupleY: 150,
	couple: { src: 'image/robin-marloes-small.jpg' },
	background: { color: 'rgba(0,0,0,0.1)'},
	house: {
	    size: 40,
	    color: 'green',
	    featuresColor: 'brown'
	}
    };
    var game = new housewarming.Game(options);
    new housewarming.View(game, playground, options);

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
