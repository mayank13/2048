var game = (function(size, highScore) {

  var grid = [];
  var gridSize = size || 4;
  var currentHighScore = 0;
  var highScore = highScore || 2048;

  var moveLeftSingleRow, moveLeft, rotateMatrix, move, fillRandom;

  var intializeGame = function(size, maxHighScore) {

    gridSize = size || 4;
    highScore = maxHighScore || 2048;
    console.log("Enter the move : left, right , up, down");
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (!grid[i]) {
          grid[i] = []
        }
        grid[i][j] = this.random();
      }
    }
    this.print(grid);
  };

  var getRandom2or4 = function() {
    var randomNumbersList = [0, 2, 4];
    return randomNumbersList[Math.floor(Math.random() * randomNumbersList.length)];
  }

  var printGrid = function(grid) {
    for (var i = 0; i < gridSize; i++) {
      console.log(grid[i]);
    }
  }

  moveLeftSingleRow = function(col) {
    var j = 0;
    var previous = null;
    var new_col = new Array(col.length).fill(0);;

    for (var i = 0; i < col.length; i++) {
      if (col[i] != 0) {
        if (previous == null) {
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
    if (previous != null) {
      new_col[j] = previous;
    }
    return new_col;
  }

  moveLeft = function(arr) {
    for (var i = 0; i < gridSize; i++) {
      arr[i] = moveLeftSingleRow(arr[i]);
    }
    //printGrid(arr)
  }

  rotateMatrix = function(arr, noOfTimes) {
    for (var i = 0; i < noOfTimes; i++) {
      var N = arr[0].length;
      for (var x = 0; x < N / 2; x++) {
        for (var y = x; y < N - x - 1; y++) {
          var temp = arr[x][y];
          arr[x][y] = arr[y][N - 1 - x];
          arr[y][N - 1 - x] = arr[N - 1 - x][N - 1 - y];
          arr[N - 1 - x][N - 1 - y] = arr[N - 1 - y][x];
          arr[N - 1 - y][x] = temp;
        }
      }
    }

  }

  fillRandom = function(grid) {
    var randomIndexI = Math.floor(Math.random() * grid.length);
    var randomIndexJ = Math.floor(Math.random() * grid.length);
    if (grid[randomIndexI][randomIndexJ] === 0) {
      grid[randomIndexI][randomIndexJ] = getRandom2or4();
      console.log("Filling random -" + grid[randomIndexI][randomIndexJ]);

    } else {
      fillRandom(grid);
    }

  }

  move = function(arr, direction) {

    switch (direction) {
      case "left":
        moveLeft(arr);
        break;
      case "right":
        rotateMatrix(arr, 2);
        //rotateMatrix(arr);
        moveLeft(arr);
        rotateMatrix(arr, 2);
        //rotateMatrix(arr);
        break;
      case "up":
        rotateMatrix(arr, 1);
        moveLeft(arr);
        rotateMatrix(arr, 3);
        //rotateMatrix(arr);
        //rotateMatrix(arr);
        break;
      case "down":
        rotateMatrix(arr, 3);
        //rotateMatrix(arr);
        //rotateMatrix(arr);
        moveLeft(arr);
        rotateMatrix(arr, 1);
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