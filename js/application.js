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

    var go = document.getElementById('go');
    go.addEventListener('click', function(){
	document.body.removeChild(go);
	document.body.addEventListener('mousemove', mousemoveHandler);
	document.body.addEventListener('keyup', function(event){
	    if (event.keyCode == 65) {
		document.body.removeEventListener('mousemove', mousemoveHandler);
		target = 'house';
		document.body.appendChild(go);
		go.setAttribute('style',
				'left: ' + game.house.x + 'px;',
				'top: ' + game.house.y + 'px;');
	    }
	});
    });

    var code = new konami.Code();
    code.on('code', function(step){ console.log(step)});
    code.on('reset', function(){ console.log('whoops')});
    code.on('konami', function(){ console.log('power up')});
    document.body.addEventListener('keyup', code.keyListener.bind(code));

})(document, housewarming, konami);
