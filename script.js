// Model
var tasks = [
    {description: 'Handle til middag',person: 'Kari', isDone: false,  date:'', dateToBeDone: ''},
    {description: 'Lage middag',person: 'Ola', isDone: false,  date:'', dateToBeDone: ''},
    {description: 'Spise middag', person: 'Nordmann', isDone: false, date:'', dateToBeDone: ''},
];

//Controller
var taskDescriptionInput = document.getElementById('taskDescription');
var personDescription = document.getElementById('taskPerson');
var date = new Date().toLocaleDateString();
const dateToBeDone = getRandomDateToBeDone();

function getRandomDateToBeDone() {
    const today = new Date();
    const oneWeekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const randomTime = today.getTime() + Math.random() * (oneWeekFromNow.getTime() - today.getTime());
    return new Date(randomTime).toLocaleDateString();
}

function addTask() {
    tasks.push({
        description: taskDescriptionInput.value, 
        isDone: false,
        person: taskPerson.value,
        date: '',
        dateToBeDone: getRandomDateToBeDone(),
        });
    taskDescriptionInput.value = '';
    taskPerson.value = '';
    show();
}
// View
const DisplayFormat = (DataFormatString = "{0:dd/MM/yyyy}");
var tasksTable = document.getElementById('tasksTable');
    show();

    function show() {
        let html = `
                        <tr>
                            <th>Oppgave:</th>
                            <th>Hvem:</th>
                            <th>Frist:</th>
                            <th>Dato fullført:</th>
                            <th>Gjort:</th>
                            <th>Rediger:</th>
                        </tr>`;
        for (let i = 0; i < tasks.length; i++) {
            html += createHtmlRow(i);
        }
        tasksTable.innerHTML = html;
    }

    function createHtmlRow(i) {
        const task = tasks[i];
        const checkedHtml = task.isDone ? 'checked="checked"' : '';
        if (!task.editMode) return `<tr>
                    <td>${task.description}</td>
                    <td>${task.person}</td>
                    <td>${task.dateToBeDone}</td>
                    <td>${task.date}</td>
                    <td><input onchange="changeIsDone(this, ${i})" type="checkbox" ${checkedHtml}></td>
                    <td>
                    <button onclick="deleteTask(${i})">Slett</button>
                    <button onclick="editTask(${i})">Endre</button>
                    </td>
                    </tr>`;
                    
        return `<tr>
                    <td><input id="editDescription${i}" type="text" value="${task.description}"/></td>
                    <td><input id="editPerson${i}" type="text" value="${task.person}"</td>
                    <td><input id="editDateToBeDone${i}" type="date" value="<td>${task.dateToBeDone}</td>"</td>
                    <td>${task.date}</td>
                    <td><input onchange="changeIsDone(this, ${i})" type="checkbox" ${checkedHtml} /></td>
                    <td>
                        <button onclick="updateTask(${i})">Lagre</button>
                    </td>
                </tr>`;
    }
            
    function changeIsDone(checkbox, index) {
        tasks[index].isDone = checkbox.checked;
        if (checkbox.checked) {
            tasks[index].date = new Date().toLocaleDateString();
        } else {
            tasks[index].date = '';
        }
        show();
    }

function deleteTask(index) {
    tasks.splice(index, 1);
    show();
}

function editTask(index) {
    tasks[index].editMode = true;
    show();
}

function updateTask(index) {
    const id = `editDescription${index}`;
    const id2 = `editPerson${index}`;
    const inputTag = document.getElementById(id);
    const inputTag2 = document.getElementById(id2);
    const task = tasks[index];
    const dateToBeDone = `editDateToBeDone`;
    task.description = inputTag.value;
    task.person = inputTag2.value;
    task.dateToBeDone = document.getElementById(`editDateToBeDone${index}`).value;
    task.date = new Date().toLocaleDateString();
    task.editMode = false;
    show();
}

function changePerson(person, index) {
    tasks[index].person = person;
    show();
}

console.log(addTask);