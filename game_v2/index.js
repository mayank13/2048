const game = require('./game.js')

var stdin = process.openStdin();
game.init(8,32);

stdin.addListener("data", function(d) {
    
    console.log("you entered: [" + 
        d.toString().trim() + "]");	
    game.move(game.grid,d.toString().trim());
  });