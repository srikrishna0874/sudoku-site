
import { Sudoku } from "./sudoku.js";


const tdElements = document.getElementsByTagName('td');

console.log(tdElements.length);

var selectedTdIndex = -1;

var remWrongAttempts = 3;



function assignSudokuToAnotherArray(arr) {
    const b = [];
    for (let i = 0; i < arr.length; i++) {
        const tmp = [...arr[i]];

        //console.log(tmp);
        b.push(tmp);
    }

    return b;
}


function placeWrongAttemptsCount(count) {
    const element = document.getElementById('wrongAttemptsContent');
    element.innerText = count;

}

function placeSudokuDigitsInTable(grid) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const tdIndex = 9 * i + j;
            if (grid[i][j] != 0) {
                tdElements[tdIndex].innerText = grid[i][j];
                tdElements[tdIndex].style.fontWeight = 600;
                tdElements[tdIndex].style.cursor = 'context-menu';
                tdElements[tdIndex].style.color = 'brown';
            }
            else {
                tdElements[tdIndex].innerText = '';
            }
        }
    }
}

const obj = new Sudoku(9);
obj.solveSudoku(obj.sudokuBoard);

const correctSudokuBoard = obj.sudokuBoard;
console.log('correct sudoku board is:');
console.log(correctSudokuBoard);

const sudoku_grid = assignSudokuToAnotherArray(correctSudokuBoard);

for (let i = 0; i < 60; i++) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    sudoku_grid[row][col] = 0;
}

placeSudokuDigitsInTable(sudoku_grid);
placeWrongAttemptsCount(3);

// console.log('after placing zeroes: ');
// console.log('correct sudoku grid is:');
// console.log(correctSudokuBoard);
// console.log('sudoku grid is: ');
// console.log(sudoku_grid);



for (let i = 0; i < tdElements.length; i++) {
    tdElements[i].addEventListener('click', () => {
        // console.log(tdElements[i]);
        const row = Math.floor(i / 9);
        const col = i % 9;

        console.log(row, col);
        //console.log(sudoku_grid);

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
        if (tdElements[selectedTdIndex].classList.contains('wrong-cell')) { }
        tdElements[selectedTdIndex].classList.remove('wrong-cell');
        tdElements[selectedTdIndex].classList.add('active-cell');
    }
    else {
        const row = Math.floor(selectedTdIndex / 9);
        const col = selectedTdIndex % 9;

        tdElements[selectedTdIndex].innerText = digit;
        tdElements[selectedTdIndex].style.fontWeight = 600;
        if (correctSudokuBoard[row][col] != digit) {
            tdElements[selectedTdIndex].classList.remove('active-cell');
            tdElements[selectedTdIndex].classList.add('wrong-cell');
            remWrongAttempts--;
            placeWrongAttemptsCount(remWrongAttempts);
            if (remWrongAttempts == 0) {
                console.log('game over');
                const cont = document.getElementsByClassName('game-over-box');
                const gameBreakingTitle = document.getElementById('text-for-breaking-game');
                gameBreakingTitle.innerText = 'You Lost!!';
                cont[0].classList.add('active-game-over-board');
            }
            
        }
        else {
            if (tdElements[selectedTdIndex].classList.contains('wrong-cell')) {
                tdElements[selectedTdIndex].classList.remove('wrong-cell');
                tdElements[selectedTdIndex].classList.add('active-cell');
            }
            if (isGameCompleted()) {
                console.log('game over');
                const cont = document.getElementsByClassName('game-over-box');
                const gameBreakingTitle = document.getElementById('text-for-breaking-game');
                gameBreakingTitle.innerText='You Win!!';
                cont[0].classList.add('active-game-over-board');
            }
        }
    }
}






function isGameCompleted() {
    for (let i = 0; i < 64; i++) {
        if (!tdElements[i].classList.contains('wrong-cell')) {
            if (tdElements[i].innerText == '') {
                //console.log('some place is empty: ' + i);
                return false;
            }
        }
    }
    return true;
}


function newGameOnClick() {
    const elem = document.getElementsByClassName('game-over-box');
    elem[0].classList.remove('active-game-over-board');
    location.reload();
}


window.digitButton = digitButton;
window.newGameOnClick = newGameOnClick;
