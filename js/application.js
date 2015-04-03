(function(document, housewarming, konami){

    var playground = document.getElementById('playground');
    playground.width = document.body.clientWidth;
    playground.height = document.body.clientHeight;

    var options = {
	distance: 20,
	couple: {
	    x: 3*playground.width/4, y: playground.height/2,
	    src: 'image/robin-marloes-small.jpg'
	},
	background: { color: 'rgba(0,0,0,0.1)'},
	house: {
	    x: playground.width/4, y: playground.height/2,
	    size: 40,
	    color: 'green',
	    featuresColor: 'brown'
	}
    };
    var game = new housewarming.Game(options);
    new housewarming.View(game, playground, options);

    var target = 'couple';
    function mousemoveHandler(event){
	game[target].placeAt(event.x, event.y);
    }
    game.on('finished', function(){
	document.body.removeEventListener('mousemove', mousemoveHandler);
	var p = document.createElement('p');
	p.innerHTML = 'Congratulations';
	p.setAttribute('class', 'winning');
	document.body.appendChild(p);
    });

    var code = new konami.Code();
    var go = document.getElementById('go');
    go.addEventListener('click', function(){
	document.body.removeChild(go);
	document.body.addEventListener('mousemove', mousemoveHandler);
	document.body.addEventListener('keyup', code.keyListener.bind(code));
    });

    code.on('konami', function(){
	document.body.removeEventListener('mousemove', mousemoveHandler);
	target = 'house';
	document.body.appendChild(go);
	go.setAttribute('style',
			'left: ' + game.house.x + 'px;',
			'top: ' + game.house.y + 'px;');
    });
})(document, housewarming, konami);
