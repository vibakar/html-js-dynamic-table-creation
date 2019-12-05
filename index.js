let leftTableData = [{
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

let selectedLeftRows = [];
let rightTableData = [];
let selectedRightRows = [];

//loading left data table
function loadLeftTableData() {
    let leftTable = document.getElementById("leftTable");
    for (var l = 0; l < leftTableData.length; l++) {
        let row = leftTable.insertRow(l + 1);
        let cells = Object.keys(leftTableData[l]);
        for (var c = 0; c < cells.length; c++) {
            if(c == 0) {
                let cell = row.insertCell(c);
                cell.innerHTML = `<input type='checkbox' id=${l} onclick='checkUncheckLeftRows(this)' />`;
            } else {
                let cell = row.insertCell(c);
                cell.innerHTML = leftTableData[l][cells[c]];
            }
        }
    }
}

loadLeftTableData();

/* 
If left side table's root checkbox is checked/unchecked, correspondingly all rows
of left side table's will be checked/unchecked.
*/
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

/* 
If one of the rows are checked/unchecked in left side table, respective rows id
will be pushed/removed to/from array.
*/
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

/* 
Pulling only selected rows from left side table and storing
it in sepearte array. Then, unchecking all the selected rows. 
*/
function addSelectedRows() {
    selectedLeftRows.forEach((id) => {
        let stud = leftTableData.find(s => s.id === id);
        rightTableData.push(stud);
    });
    let checkAll = document.getElementById('checkAllLeft');
    checkAll.checked = false;
    let rows = document.getElementById('leftTable').rows;
    for (var i = 1; i < rows.length; i++) {
        rows[i].getElementsByTagName("input")[0].checked = false;
    }
    if(selectedLeftRows.length > 0)
        addRowsToRight(rightTableData);
}

/*
Adding all the selected rows from left side table to right side table. And
before adding, deleting the existing rows from right side table and re-adding it again
to avoid duplicate entry.
*/
function addRowsToRight(arr) {
    let table = document.getElementById('rightTable');
    let rowsLength = table.rows.length;
    for (var i = rowsLength -1; i > 0; i--) {
        table.deleteRow(i)
    }
    selectedLeftRows = [];    
    let rightTable = document.getElementById("rightTable");
    for (var s = 0; s < arr.length; s++) {
        let row = rightTable.insertRow(s + 1);
        let cells = Object.keys(arr[s]);
        for (var c = 0; c < cells.length; c++) {
           if(c == 0) {
             let cell = row.insertCell(c);
             cell.innerHTML = `<input type='checkbox' id=${arr[s].id} onclick='checkUncheckRightRows(this)' />`;
           } else {
             let cell = row.insertCell(c);
             cell.innerHTML = arr[s][cells[c]];
           }
        }
    }
}

/* 
If right side table's root checkbox is checked/unchecked, correspondingly all rows
of right side table's will be checked/unchecked.
*/
function checkUncheckRightTable(event) {
    let rows = document.getElementById('rightTable').rows;
    selectedRightRows = [];
    for (var i = 1; i < rows.length; i++) {
        if(event.checked) {
            selectedRightRows.push(i);
        }
        rows[i].getElementsByTagName("input")[0].checked = event.checked;
    }
}

/* 
If one of the rows are checked/unchecked in right side table, respective rows id
will be pushed/removed to/from array.
*/
function checkUncheckRightRows(event) {
    let id = parseInt(event.id);
    let checkAll = document.getElementById('checkAllRight');
    checkAll.checked = true;
    if(event.checked) {
        if(selectedRightRows.indexOf(id) == -1)
            selectedRightRows.push(id);
    } else {
        if(selectedRightRows.indexOf(id) >= 0){
            let index = selectedRightRows.indexOf(id);
            selectedRightRows.splice(index, 1);
        }
    }
    let rows = document.getElementById('rightTable').rows;
    for (var i = 1; i < rows.length; i++) {
        if(!rows[i].getElementsByTagName("input")[0].checked) {
            checkAll.checked = false;
            break;
        }
    }
}

/*
Deleting all the rows from right side table, then from the list of 
existing right side rows removing the selected rows. Later adding remaining rows 
back to the table.
*/
function deleteRowsFromRight() {
    let table = document.getElementById('rightTable');
    let rowsLength = table.rows.length;
    for (var i = rowsLength -1; i > 0; i--) {
        table.deleteRow(i)
    }
    selectedRightRows.forEach(id => {
        rightTableData.forEach((stud, i) => {
            if(stud.id == id) {
                rightTableData.splice(i, 1);
            }
        })
    });
    let checkAll = document.getElementById('checkAllRight');
    checkAll.checked = false;
    addRowsToRight(rightTableData);
}