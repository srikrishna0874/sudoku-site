const table = document.getElementById('sudoku-table');
const tdElements = document.getElementsByTagName('td');

console.log(tdElements.length);



for (let i = 0; i < tdElements.length; i++) {
    tdElements[i].addEventListener('click', () => {
        console.log(tdElements[i]);
        for (let j = 0; j < tdElements.length; j++) {
            tdElements[j].classList.remove('active-cell');
        }
        tdElements[i].classList.add('active-cell');
    });
}


// for (let i = 0; i < tdElements.length; i++) {
//     tdElements[i].addEventListener('click', () => {
//         tdElements[i].classList.toggle('active-cell');
//     });
// }