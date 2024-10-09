// form
const form = document.querySelector("form");

// input text box
const todoInput = document.getElementById("todo-input");

// add button
const addButton = document.getElementById("add-button");

// todo list ul
const todoList = document.getElementById("todo-app__list");

// add event listener to the form
form.addEventListener("submit", handleFormSubmit);

// handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  const todoText = todoInput.value.trim();
  if (todoText) {
    createTodoItem(todoText);

    // empty input box
    todoInput.value = "";
  }
}

// create new todo item
function createTodoItem(todoText) {
  const todoId = "todo-" + Date.now();
  const todoItem = document.createElement("li");
  todoItem.className = "todo__item";
  todoItem.innerHTML = `
     <input type="checkbox" id="todo-1" />
            <label class="todo__item__checkbox" for="todo-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              >
                <path
                  d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"
                />
              </svg>
            </label>
            <label for="todo-1" class="todo__item__text"> ${todoText} </label>
            <label for="todo-1" class="todo__item__delete">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              >
                <path
                  d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
                />
              </svg>
            </label>
    `;

  // handle checking/unchecking todo item
  const checkbox = todoItem.querySelector('input[type="checkbox"]');
  checkbox.addEventListener("change", () => {
    todoItem.classList.toggle("completed");
    saveTodos();
  });

  // handle deleting todos
  const deleteButton = todoItem.querySelector(".todo__item__delete");
  deleteButton.addEventListener("click", () => {
    todoItem.remove();
    saveTodos();
  });

  todoList.appendChild(todoItem);
  saveTodos();
}

// save todos to local storage
function saveTodos() {
  const todos = Array.from(todoList.children).map((todoItem) => ({
    text: todoItem.querySelector(".todo__item__text").textContent,
    completed: todoItem.classList.contains("completed"),
  }));
  localStorage.setItem("todos", JSON.stringify(todos));
}

// load saved todos when page is loaded
function loadTodos() {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  savedTodos.forEach((todo) => {
    createTodoItem(todo.text);
    if (todo.completed) {
      const lastTodo = todoList.lastElementChild;
      lastTodo.classList.add("completed");
      lastTodo.querySelector('input[type="checkbox"]').checked = true;
    }
  });
}

document.addEventListener("DOMContentLoaded", loadTodos);
