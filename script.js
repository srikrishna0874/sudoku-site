const table = document.getElementById('sudoku-table');
const tdElements = document.getElementsByTagName('td');

console.log(tdElements.length);

var selectedTdIndex = 0;

const sudoku_grid = Array.from({ length: 9 }, () => Array(9).fill(0));

const real_sudoku_grid = Array.from({ length: 9 }, () => Array(9).fill(0));



for (let i = 0; i < tdElements.length; i++) {
    tdElements[i].addEventListener('click', () => {
        // console.log(tdElements[i]);
        const row = Math.floor(i / 9);
        const col = i % 9;

        console.log(row,col);
        console.log(sudoku_grid);

        if (sudoku_grid[row][col] == 0) {
            for (let j = 0; j < tdElements.length; j++) {
                tdElements[j].classList.remove('active-cell');
            }

            tdElements[i].classList.add('active-cell');
            selectedTdIndex = i;
            console.log(selectedTdIndex);
        }

    });
}


function digitButton(digit) {
    console.log('clicked button is:' + digit);
    if (tdElements[selectedTdIndex].innerText == digit) {
        tdElements[selectedTdIndex].innerText = '';
        if(tdElements[selectedTdIndex].classList.contains('wrong-cell')) {}
        tdElements[selectedTdIndex].classList.remove('wrong-cell');
        tdElements[selectedTdIndex].classList.add('active-cell');
    }
    else {
        const row = Math.floor(selectedTdIndex / 9);
        const col = selectedTdIndex % 9;

        tdElements[selectedTdIndex].innerText = digit;
        if(!isValidPlace(row,col,digit)) {
            tdElements[selectedTdIndex].classList.remove('active-cell');
            tdElements[selectedTdIndex].classList.add('wrong-cell');
        }
    }
}

function isValidPlace(row, col, num) {
    //check row

    for (let i = 0; i < 9; i++) {
        if (sudoku_grid[row][i] == num) {
            return false;
        }

    }

    //check column

    for (let i = 0; i < 9; i++) {
        if (sudoku_grid[i][col] == num) {
            return false;
        }
    }


    //check 3x3 grid

    const gridStartRow = row - row % 3;
    const gridStartCol = col - col % 3;

    for (let i = gridStartRow; i < gridStartRow + 3; i++) {
        for (let j = gridStartCol; j < gridStartCol + 3; j++) {
            if (sudoku_grid[i][j] == num) {
                return false;
            }
        }
    }
    return true;


}

function generateNewSudokePuzzle() {




    function shuffle(array) {
        //just swap any two random indices

        for (let i = array.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    


    function solveSudoku() {
        const digitsToBeFilled = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        //console.log(digitsToBeFilled);
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {


                //console.log(digitsToBeFilled);
                if (sudoku_grid[r][c] == 0) {
                    for (let i = 0; i < 9; i++) {
                        if (isValidPlace(r, c, digitsToBeFilled[i])) {
                            sudoku_grid[r][c] = digitsToBeFilled[i];
                            if (solveSudoku()) {
                                return true;
                            }
                            else {
                                sudoku_grid[r][c] = 0;
                            }
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    function fillSudokuGrid() {
        solveSudoku();
        //real_sudoku_grid=sudoku_grid;
        console.log(sudoku_grid);

        //easy

        for (let i = 0; i < 60; i++) {
            const r = Math.floor(Math.random() * 9);
            const c = Math.floor(Math.random() * 9);
            sudoku_grid[r][c] = 0;
        }

        console.log(sudoku_grid);
    }

    fillSudokuGrid();
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (sudoku_grid[i][j] != 0) {
                tdElements[9 * i + j].innerText = sudoku_grid[i][j];
                tdElements[9 * i + j].style.fontWeight = 600;
                tdElements[9 * i + j].style.cursor = 'context-menu';
            }
        }
    }



}

window.onload = generateNewSudokePuzzle();