var NO_OF_COLUMNS = 4;
var NO_OF_ROWS = 4;

var arr = [
	[],
	[],
	[],
	[]
];

function initializeGrid(arr){
	for (let i = 0 ; i < NO_OF_ROWS; i++){
		for (let j = 0 ; j < NO_OF_COLUMNS ; j++)
		{
			arr[i][j] = getRandom2or4();
		}
	}
	printGrid(arr);
	
}

function getRandom2or4(){
	var randomNumbersList = [0,2,4];
	 return randomNumbersList[Math.floor(Math.random()*randomNumbersList.length)];
}

function printGrid(arr){
	for ( var i = 0 ; i < NO_OF_ROWS ; i++){
		console.log(arr[i]);
	}
}

//initializeGrid(arr);
//printGrid();

function move_left_single_row(col){
	var j = 0 ; 
	var previous = null;
	var new_col = [0,0,0,0];
	for (var i = 0 ; i < col.length ; i++){
		if ( col[i] != 0){
			if ( previous == null){
				previous = col[i];
			}else{
				if (previous == col[i]){
					new_col[j] = 2 *col[i];
					j++;	
					previous = null;
				}else{
					new_col[j] = previous;
					j++;
					previous = col[i];
				}
				
			}
		}
	}
	if(previous != null){
		new_col[j] = previous;
	}
	return new_col;
}

//Test move_left
//move_left_single_row([2,2,2,8])

function move_left(arr){
	for ( var i = 0 ; i < NO_OF_ROWS ; i++ ){
		arr[i] = move_left_single_row(arr[i]);
	}
	//printGrid(arr)
}

function rotateMatrix(arr)
{   
    var N = arr[0].length;
    // Consider all squares one by one
    for (var x = 0; x < N / 2; x++)
    {
        // Consider elements in group of 4 in 
        // current square
        for (var y = x; y < N-x-1; y++)
        {
            // store current cell in temp variable
            var temp = arr[x][y];
 
            // move values from right to top
            arr[x][y] = arr[y][N-1-x];
 
            // move values from bottom to right
            arr[y][N-1-x] = arr[N-1-x][N-1-y];
 
            // move values from left to bottom
            arr[N-1-x][N-1-y] = arr[N-1-y][x];
 
            // assign temp to left
            arr[N-1-y][x] = temp;
        }
    }
}


function move(arr,direction){
	switch (direction) {
		  case 1:
		  move_left(arr);
		    break;
		  case 2:
		    rotateMatrix(arr);
		    rotateMatrix(arr);
		    move_left(arr);
		    rotateMatrix(arr);
		    rotateMatrix(arr);
		    break;
		  case 3:
		    rotateMatrix(arr);
		    move_left(arr);
		    rotateMatrix(arr);
		    rotateMatrix(arr);
		    rotateMatrix(arr);
		    break;
		  case 4:
		    rotateMatrix(arr);
		    rotateMatrix(arr);
		    rotateMatrix(arr);
		    move_left(arr);
		    rotateMatrix(arr);
		    break;
		  default:
		   console.log("Rotations are not required")
}

}


initializeGrid(arr);
console.log("initializeGrid");
printGrid(arr);
console.log("move left");
move(arr,1)
printGrid(arr);
console.log("move left done");
console.log("move right");
move(arr,2);
printGrid(arr)
console.log("move right done");
