const form = document.querySelector('#todo-form');
const input = document.querySelector('#task-input');
const list = document.querySelector('#todo-list');

const createTodoItem = (text) => {
  const listItem = document.createElement('li');
  listItem.className = 'todo-item';

  const leftBlock = document.createElement('div');
  leftBlock.className = 'todo-left';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  const span = document.createElement('span');
  span.textContent = text;

  checkbox.addEventListener('change', () => {
    listItem.classList.toggle('done');
  });

  const deleteButton = document.createElement('button');
  deleteButton.textContent = '🗑';
  deleteButton.className = 'delete-btn';

  deleteButton.addEventListener('click', () => {
    list.removeChild(listItem);
  });

  leftBlock.appendChild(checkbox);
  leftBlock.appendChild(span);

  listItem.appendChild(leftBlock);
  listItem.appendChild(deleteButton);

  return listItem;
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const taskText = input.value.trim();
  if (taskText === '') {
    return;
  }

  const todoItem = createTodoItem(taskText);
  list.appendChild(todoItem);

  input.value = '';
});
