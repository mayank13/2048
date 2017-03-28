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

initializeGrid(arr);
//printGrid();

