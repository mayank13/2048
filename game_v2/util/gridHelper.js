exports.rotateMartrix = function(arr,noOfTimes){

    var N = arr[0].length;
    for (var x = 0; x < N / 2; x++)
    {
        for (var y = x; y < N-x-1; y++)
        {
            var temp = arr[x][y];
            arr[x][y] = arr[y][N-1-x];
            arr[y][N-1-x] = arr[N-1-x][N-1-y];
            arr[N-1-x][N-1-y] = arr[N-1-y][x];
            arr[N-1-y][x] = temp;
        }
    }
}