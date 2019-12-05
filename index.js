let studentsArr = [{
    id: 1,
    name: 'abc',
    age: 5,
    dob: '23/10/2014',
    city: 'CBE'
}, {
    id: 2,
    name: 'def',
    age: 5,
    dob: '12/07/2014',
    city: 'Trichy'
}, {
    id: 3,
    name: 'ghi',
    age: 6,
    dob: '07/11/2013',
    city: 'Trichy'
}, {
    id: 4,
    name: 'jkl',
    age: 5,
    dob: '03/06/2014',
    city: 'Trichy'
}, {
    id: 5,
    name: 'mno',
    age: 6,
    dob: '30/02/2013',
    city: 'CBE'
}];

let leftTable = document.getElementById("leftTable");
for (var s = 0; s < studentsArr.length; s++) {
    let row = leftTable.insertRow(s + 1);
    let cells = Object.keys(studentsArr[s]);
    for (var c = 0; c < cells.length; c++) {
       if(c == 0) {
         let cell = row.insertCell(c);
         cell.innerHTML = `<input type='checkbox' id=${s} onclick='checkUncheckLeftRows(this)' />`;
       } else {
         let cell = row.insertCell(c);
         cell.innerHTML = studentsArr[s][cells[c]];
       }
    }
}

let selectedLeftRows = [];

function checkUncheckLeftTable(event) {
    let rows = document.getElementById('leftTable').rows;
    selectedLeftRows = [];
    for (var i = 1; i < rows.length; i++) {
        if(event.checked) {
            selectedLeftRows.push(i);
        }
        rows[i].getElementsByTagName("input")[0].checked = event.checked;
    }
}

function checkUncheckLeftRows(event) {
    let id = parseInt(event.id) + 1;
    let checkAll = document.getElementById('checkAllLeft');
    checkAll.checked = true;
    if(event.checked) {
        if(selectedLeftRows.indexOf(id) == -1)
            selectedLeftRows.push(id);
    } else {
        if(selectedLeftRows.indexOf(id) >= 0){
            let index = selectedLeftRows.indexOf(id);
            selectedLeftRows.splice(index, 1);
        }
    }
    let rows = document.getElementById('leftTable').rows;
    for (var i = 1; i < rows.length; i++) {
        if(!rows[i].getElementsByTagName("input")[0].checked) {
            checkAll.checked = false;
            break;
        }
    }
}

function addRowsToRight() {
    let rightTableRows = [];
    selectedLeftRows.forEach((id) => {
        let stud = studentsArr.find(s => s.id === id);
        rightTableRows.push(stud);
    });
    let rightTable = document.getElementById("rightTable");
    for (var s = 0; s < rightTableRows.length; s++) {
        let row = rightTable.insertRow(s + 1);
        let cells = Object.keys(rightTableRows[s]);
        for (var c = 0; c < cells.length; c++) {
           if(c == 0) {
             let cell = row.insertCell(c);
             cell.innerHTML = `<input type='checkbox' id=${s} onclick='checkUncheckLeftRows(this)' />`;
           } else {
             let cell = row.insertCell(c);
             cell.innerHTML = rightTableRows[s][cells[c]];
           }
        }
    }
}