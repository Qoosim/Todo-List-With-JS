import './style.css';

window.onload = loadTasks;

function loadTasks() {
    // Get the tasks from localStorage and convert it to an array
    let tasks = Array.from(JSON.parse(localStorage.getItem('tasks')));

    // Loop through the tasks and add them to the list
    tasks.forEach(task => {
        const list = document.querySelector('ul');
        const li = document.createElement('li');
        li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${task.completed ? 'checked' : ''}>
        <input type="text" value="${task.task}" class="task ${task.completed ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
        <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
        list.insertBefore(li, list.children[0]);
    });
}

function addTask() {
    const task = document.querySelector('form input');
    const list = document.querySelector('ul');

    // return if task is empty
    if (task.value === '') {
        alert('Please add some task!');
        return false;
    }

    // check is task already exist
    let tasks = Array.from(JSON.parse(localStorage.getItem('tasks')));
    // task already exist
    tasks.forEach(todo => {
        if (todo.task === task.value) {
            alert('Task already exist!');
            task.value = '';
            return;
        }
    })
    
    // add task to local storage
    localStorage.setItem('tasks', JSON.stringify([...JSON.parse(localStorage.getItem('tasks') || '[]'), { task: task.value, completed: false }]));

    // create list item, and innerHTML and append to ul
    const li = document.createElement('li');
    li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check">
      <input type="text" value="${task.value}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
      <i class="fa fa-trash" onclick="removeTask(this)"></i>`
    list.insertBefore(li, list.children[0]);

    // clear input
    task.value = '';
}

// store curent task to track changes
let currentTask = null;

// get current task
function getCurrentTask(event) {
    currentTask = event.value;
}

// edit the task and update local storage
function editTask(event) {
    let task = Array.from(JSON.parse(localStorage.getItem('tasks')));
    // check if task is empty
    if (event.value === '') {
        alert('Task is empty');
        event.value = currentTask;
        return;
    }

    // task already exist
    tasks.forEach(task => {
        if (task.task === curentTask) {
            task.task = event.value;
        }
    })

    // update local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function taskComplete(event) {
    let tasks = Array.from(JSON.parse(localStorage.getItem('tasks')));
    tasks.forEach(task => {
        if (task.task === event.nextElementSibling.value) {
            task.completed = !task.completed;
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
    event.nextElementSibling.classList.toggle('completed');
}

function removeTask(event) {
    let tasks = Array.from(JSON.parse(localStorage.getItem('tasks')));
    tasks.forEach(task => {
        if (task.task === event.parentNode.children[1].value) {
            // delete task
            tasks.splice(tasks.indexOf(task), 1);
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
    event.parentelement.remove();
}
