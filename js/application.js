(function(document, housewarming){
    var playground = document.getElementById('playground');
    playground.width = document.body.clientWidth;
    playground.height = document.body.clientHeight;

    var couple = new housewarming.Couple(200, 200);
    var house = new housewarming.House(100, 100);
    new housewarming.View(couple, house, playground);
})(document, housewarming);
