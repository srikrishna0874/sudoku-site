


export class Sudoku {
    constructor(n) {
        this.n = n;
        this.sudokuBoard = this.createEmptySudokuBoard();


    }

    createEmptySudokuBoard() {
        let board = [];
        for (let i = 0; i < 9; i++) {


            board.push(new Array(9).fill(0));

            //console.log('for '+i+' board is '+board.length);
        }
        return board;
    }

    isValid(board, a, b, num) {
        //console.log('a= ' + a + ' and b=' + b);

        for (let ind = 0; ind < 9; ind++) {
            if (board[a][ind] == num) {
                return false;
            }
            if (board[ind][b] == num) {
                return false;
            }
            //console.log('true');
        }

        const gridStartRow = Math.floor(a / 3) * 3;
        const gridStartCol = Math.floor(b / 3) * 3;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i + gridStartRow][j + gridStartCol] == num) {
                    return false;
                }
            }
        }
        //console.log('true');

        return true;

    }

    shuffle(nums) {
        for (let i = nums.length - 1; i >= 0; i--) {
            const ind = Math.floor(Math.random() * (i + 1));
            [nums[i], nums[ind]] = [nums[ind], nums[i]];
        }
        return nums;
    }

    solveSudoku(board) {

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] == 0) {
                    //console.log('rand is ' + this.numsToBePlaced);
                    let numsToBePlaced = this.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
                    for (let num = 0; num < 9; num++) {
                        if (this.isValid(board, i, j, numsToBePlaced[num])) {
                            board[i][j] = numsToBePlaced[num];
                            if (this.solveSudoku(board)) {
                                return true;
                            }
                            else {
                                board[i][j] = 0;
                            }
                        }
                    }
                    return false;
                }
            }
        }
        //console.log(board);
        return true;
    }



}
