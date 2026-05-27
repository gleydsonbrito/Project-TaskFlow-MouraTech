const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const taskCounter = document.getElementById('taskCounter');

const themeToggle = document.getElementById('themeToggle');
const filterButtons = document.querySelectorAll('.filter-btn');

let tasks = [];
let currentFilter = 'all';

function renderTasks() {
  taskList.innerHTML = '';
  let filteredTasks = tasks;
  if (currentFilter === 'pending') {
    filteredTasks = tasks.filter(task => !task.completed);
  }
  if (currentFilter === 'completed') {
    filteredTasks = tasks.filter(task => task.completed);
  }
  filteredTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.add('task');
    if (task.completed) {
      li.classList.add('completed');
    }
    li.innerHTML = `
      <span>${task.text}</span>
      <div class="task-actions">
        <button class="complete-btn">
          ✔
        </button>
        <button class="delete-btn">
          ✖
        </button>
      </div>
    `;

    const completeBtn = li.querySelector('.complete-btn');
    completeBtn.addEventListener('click', () => {
      task.completed = !task.completed;
      renderTasks();
    });

    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
      tasks.splice(index, 1);
      renderTasks();
    });

    taskList.appendChild(li);
  });
  updateCounter();
}

function updateCounter() {
  //função para contar tasks pendentes
  //o objeto 'taskCounter' deve ser atualizado com a quantidade de tasks pendentes
  //deve constar x tarefas pendentes como texto na tela

  const pendingTasks = tasks.filter(task => !task.completed);
  taskCounter.textContent = `${pendingTasks.length} tarefas pendentes`;

}

addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    return;
  }

  const task = {
    text: taskText,
    completed: false
  };

  tasks.push(task);
  taskInput.value = '';
  renderTasks();
});

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    document
      .querySelector('.filter-btn.active')
      .classList
      .remove('active');
    button.classList.add('active');
    currentFilter = button.dataset.filter;
    renderTasks();
  });

});

themeToggle.addEventListener('click', () => {
  //há uma classe dark já implementada no CSS
  //sua missão é implementar a funcionalidade de ativação desativação do Dark Mode

  document.body.classList.toggle('dark');

});
