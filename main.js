const addTaskBtn = document.getElementById('add-task-button');
const taskInput = document.getElementById('input-task');
const taskList = document.querySelector('.task-list');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItemElems = [];

function Task(description) {
    this.description = description;
    this.completed = false;
}

const createTemplate = (task, index) => {
    return `
      <li>
        <input type="checkbox" class="complete-btn" onclick="completeTask(${index})" ${task.completed ? 'checked' : ''}>
        <div class="single-task">
            <span class="task ${task.completed ? 'checked' : ''}">${task.description}</span>
            <button class="delete-btn" onclick="deleteTask(${index})"><img src="delete.svg"></button>
        </div>
      </li>   
    `
}

const fillHtmlList = () => {
    taskList.innerHTML = "";
    if (tasks.length > 0) {
        tasks.forEach((item, index) => {
            taskList.innerHTML += createTemplate(item, index);
        });
        todoItemElems = document.querySelectorAll('.task');
    }
}
fillHtmlList();

const updateLocal = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeTask = (index) => {       
    tasks[index].completed = !tasks[index].completed;
    if(tasks[index].completed) {
        todoItemElems[index].classList.add('checked');
    } else {
        todoItemElems[index].classList.remove('checked');
    }
    updateLocal();
    fillHtmlList();
}

addTaskBtn.addEventListener('click', () => {
    tasks.push(new Task(taskInput.value));
    updateLocal();
    fillHtmlList();
    taskInput.value = '';
})

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateLocal();
    fillHtmlList();
}

