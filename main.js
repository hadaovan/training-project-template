var selectedRow = null;

function onFormSubmit() {
  var formData = readFormData();
  if (selectedRow == null) {
    insertNewRecord(formData);
  } else {
    updateRecord(formData);
  }
  resetForm();
}

function readFormData() {
var formData = {};
formData["typeFile"] = document.getElementById("typeFile").value;
formData["fullName"] = document.getElementById("fullName").value;
formData["modified"] = document.getElementById("modified").value;
formData["modifiedBy"] = document.getElementById("modifiedBy").value;
return formData;
}

function insertNewRecord(data) {
  var table = document.getElementById("demoTable").getElementsByTagName('tbody')[0];
  var newRow = table.insertRow(table.length);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.typeFile;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.fullName;
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.modified;
  cell4 = newRow.insertCell(3);
  cell4.innerHTML = data.modifiedBy;
  cell4 = newRow.insertCell(4);
  cell4.innerHTML = `<button class="btn" onClick="onEdit(this)"><i class="fa-solid fa-pen-to-square"></i></button>
                     <button class="btn" onClick="onDelete(this)"><i class="fa-solid fa-trash"></i></button> `;
}

function resetForm() {
  document.getElementById("typeFile").value = "";
  document.getElementById("fullName").value = "";
  document.getElementById("modified").value = "";
  document.getElementById("modifiedBy").value = "";
  selectedRow = null;
}

function onEdit(td) {
  selectedRow = td.parentElement.parentElement;
  document.getElementById("typeFile").value = selectedRow.cells[0].innerHTML;
  document.getElementById("fullName").value = selectedRow.cells[1].innerHTML;
  document.getElementById("modified").value = selectedRow.cells[2].innerHTML;
  document.getElementById("modifiedBy").value = selectedRow.cells[3].innerHTML;
}

function updateRecord(formData) {
  selectedRow.cells[0].innerHTML = formData.typeFile;
  selectedRow.cells[1].innerHTML = formData.fullName;
  selectedRow.cells[2].innerHTML = formData.modified;
  selectedRow.cells[3].innerHTML = formData.modifiedBy;
}

function onDelete(td) {
  if (confirm('Are you sure to delete this row ?')) {
      row = td.parentElement.parentElement;
      document.getElementById("demoTable").deleteRow(row.rowIndex);
      resetForm();
  }
}

// -----------
