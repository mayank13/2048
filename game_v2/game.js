const gridHelper = require('./util/gridHelper.js');
var game = (function() {

  var grid = [];
  var gridSize ;
  var currentHighScore;
  var highScore;

  var moveLeftSingleRow, moveLeft, rotateMatrix, move, fillRandom;

  var intializeGame = function(size, maxHighScore) {

    gridSize = size || 4;
    highScore = maxHighScore || 2048;
    console.log("Enter the move : left, right , up, down");
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (!grid[i]) {
          grid[i] = [];
        }
        grid[i][j] = this.random();
      }
    }
    this.print(grid);
  };

  var getRandom2or4 = function() {
    var randomNumbersList = [0, 2, 4];
    return randomNumbersList[Math.floor(Math.random() * randomNumbersList.length)];
  };

  var printGrid = function(grid) {
    for (var i = 0; i < gridSize; i++) {
      console.log(grid[i]);
    }
  };

  moveLeftSingleRow = function(col) {
    var j = 0;
    var previous = null;
    var new_col = new Array(col.length).fill(0);

    for (var i = 0; i < col.length; i++) {
      if (col[i] !== 0) {
        if (previous === null) {
          previous = col[i];
        } else {
          if (previous == col[i]) {
            new_col[j] = 2 * col[i];
            //update the high score
            if (new_col[j] > currentHighScore) {
              currentHighScore = new_col[j];
            }
            j++;
            previous = null;
          } else {
            new_col[j] = previous;
            j++;
            previous = col[i];
          }

        }
      }
    }
    if (previous !== null) {
      new_col[j] = previous;
    }
    return new_col;
  };

  moveLeft = function(arr) {
    for (var i = 0; i < gridSize; i++) {
      arr[i] = moveLeftSingleRow(arr[i]);
    }
    //printGrid(arr)
  };

  fillRandom = function(grid) {
    var randomIndexI = Math.floor(Math.random() * grid.length);
    var randomIndexJ = Math.floor(Math.random() * grid.length);
    if (grid[randomIndexI][randomIndexJ] === 0) {
      grid[randomIndexI][randomIndexJ] = getRandom2or4();
      console.log("Filling random -" + grid[randomIndexI][randomIndexJ]);

    } else {
      fillRandom(grid);
    }

  };

  move = function(arr, direction) {

    switch (direction) {
      case "left":
        moveLeft(arr);
        break;
      case "right":
        gridHelper.rotateMatrix(arr, 2);
        moveLeft(arr);
        gridHelper.rotateMatrix(arr, 2);
        break;
      case "up":
        gridHelper.rotateMatrix(arr, 1);
        moveLeft(arr);
        gridHelper.rotateMatrix(arr, 3);
        break;
      case "down":
        gridHelper.rotateMatrix(arr, 3);
        moveLeft(arr);
        gridHelper.rotateMatrix(arr, 1);
        break;
      default:
        console.log("Rotations are not required");
    }
    fillRandom(arr);
    printGrid(arr);
    if (currentHighScore >= highScore) {
      console.log("You win");
    }

  };

  //Return the public Interface
  return {

    grid: grid,
    init: intializeGame,
    print: printGrid,
    random: getRandom2or4,
    move: move


  };

})();

module.exports = game;