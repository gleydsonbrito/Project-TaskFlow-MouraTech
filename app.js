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

}

addTaskBtn.addEventListener('click', () => {
  //função para adiconar tarefas
  //não deve permitir texto em branco
  //cada tarefa é representada por um objeto JSON do tipo
  //cada tarefa inicia como não completada por padrão
  /* 
  task = {
    text: '',
    completed: false
  }
  */
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

