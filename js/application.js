(function(document, housewarming){
    var playground = document.getElementById('playground');
    playground.width = document.body.clientWidth;
    playground.height = document.body.clientHeight;

    var house = new housewarming.House(100, 100);
    new housewarming.View(house, playground);
})(document, housewarming);
