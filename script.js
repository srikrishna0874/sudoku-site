const table = document.getElementById('sudoku-table');
const tdElements = document.getElementsByTagName('td');



for (let i = 0; i < tdElements.length; i++) {
    tdElements[i].addEventListener('click', () => {
        console.log(tdElements[i].cellIndex);
    });
}