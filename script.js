// Student Database Web App - JS Logic (BCA 4th Sem Level)
// Simulates MySQL JDBC with localStorage

let students = [];
let isConnected = false;
let selectedRowId = null;

const idField = document.getElementById('idField');
const nameField = document.getElementById('nameField');
const searchField = document.getElementById('searchField');
const tableBody = document.getElementById('tableBody');
const statusMsg = document.getElementById('statusMsg');

document.addEventListener('DOMContentLoaded', function() {
    // Event Listeners
    document.getElementById('connectBtn').addEventListener('click', connectToDB);
    document.getElementById('addBtn').addEventListener('click', addStudent);
    document.getElementById('updateBtn').addEventListener('click', updateStudent);
    document.getElementById('deleteBtn').addEventListener('click', deleteStudent);
    document.getElementById('searchBtn').addEventListener('click', searchStudent);
    document.getElementById('refreshBtn').addEventListener('click', () => loadStudents(''));

    // Table row clicks
    tableBody.addEventListener('click', rowClick);

    // Search on Enter
    searchField.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') searchStudent();
    });

    // Load initial data
    loadStudents('');
});

function showStatus(msg, isError = false) {
    statusMsg.textContent = msg;
    statusMsg.className = isError ? 'status-error' : 'status-success';
    setTimeout(() => { statusMsg.textContent = ''; }, 3000);
}

function connectToDB() {
    isConnected = true;
    students = JSON.parse(localStorage.getItem('students')) || [];
    showStatus('Connected to localStorage DB successfully! Data loaded.');
    loadStudents('');
}

function loadStudents(searchTerm = '') {
    if (!isConnected) {
        showStatus('Please connect first!', true);
        return;
    }

    const filteredStudents = students.filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    tableBody.innerHTML = '';
    filteredStudents.forEach(student => {
        const row = tableBody.insertRow();
        row.id = `row-${student.id}`;
        row.classList.add('table-row');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
        `;
    });

    // Clear search field on refresh
    if (searchTerm === '') searchField.value = '';
}

function addStudent() {
    if (!isConnected) return showStatus('Connect first!', true);

    const id = parseInt(idField.value);
    const name = nameField.value.trim();

    if (!id || !name) return showStatus('ID and Name required!', true);
    if (students.find(s => s.id === id)) return showStatus('ID already exists!', true);

    students.push({ id, name });
    localStorage.setItem('students', JSON.stringify(students));
    showStatus('Student added!');
    loadStudents('');
    clearFields();
}

function updateStudent() {
    if (!isConnected || !selectedRowId) return showStatus('Select a row first!', true);

    const name = nameField.value.trim();
    if (!name) return showStatus('Name required!', true);

    const studentIndex = students.findIndex(s => s.id == selectedRowId);
    if (studentIndex === -1) return showStatus('Student not found!', true);

    students[studentIndex].name = name;
    localStorage.setItem('students', JSON.stringify(students));
    showStatus('Student updated!');
    loadStudents('');
    clearFields();
    selectedRowId = null;
}

function deleteStudent() {
    if (!isConnected || !selectedRowId) return showStatus('Select a row first!', true);

    students = students.filter(s => s.id != selectedRowId);
    localStorage.setItem('students', JSON.stringify(students));
    showStatus('Student deleted!');
    loadStudents('');
    clearFields();
    selectedRowId = null;
}

function searchStudent() {
    loadStudents(searchField.value);
}

function rowClick(e) {
    const row = e.target.closest('tr');
    if (!row) return;

    // Deselect others
    document.querySelectorAll('.table-row.selected').forEach(r => r.classList.remove('selected'));
    
    row.classList.add('selected');
    const cells = row.cells;
    selectedRowId = parseInt(cells[0].textContent);
    idField.value = selectedRowId;
    nameField.value = cells[1].textContent;
}

function clearFields() {
    idField.value = '';
    nameField.value = '';
    searchField.value = '';
    selectedRowId = null;
    document.querySelectorAll('.table-row.selected').forEach(r => r.classList.remove('selected'));
}
