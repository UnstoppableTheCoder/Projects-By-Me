document.addEventListener("DOMContentLoaded", function () {
  const inputValue = document.querySelector(".todo-text-input");
  const addBtn = document.querySelector(".add-todo-button");
  const todoItems = document.querySelector(".todo-items");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  addBtn.addEventListener("click", function () {
    addTask();
  });

  function addTask() {
    const task = inputValue.value.trim();
    if (task) {
      const newTask = {
        id: Date.now(),
        task: task,
        completed: false,
      };

      tasks.push(newTask);
      inputValue.value = "";
      saveToLocalStorage();
      rendertasks();
    }
  }

  function rendertasks() {
    todoItems.innerHTML = "";
    tasks.map((task) => {
      const list = document.createElement("li");
      list.classList.add("todo-item");
      console.log(task);
      list.innerHTML = `
          <span class="todo-item-name">${task.task}</span>
          <input type="text" value="${task.task}" class="edit-input hidden" />
          <span class="todo-item-actions">
            <button class="edit-todo-button" data-name="editBtn" data-id=${task.id}>Edit</button>
            <button class="delete-todo-button" data-name="deleteBtn" data-id=${task.id}>Delete</button>
            <button class="add-edited-task hidden" data-name="addEditedTask" data-id=${task.id}>Add</button>
          </span>
      `;

      todoItems.appendChild(list);
    });
  }

  document.querySelector(".todo-items").addEventListener("click", function (e) {
    if (e.target.dataset.name === "deleteBtn") {
      tasks = tasks.filter((task) => task.id !== +e.target.dataset.id);
      rendertasks();
      saveToLocalStorage();
    } else if (e.target.dataset.name === "editBtn") {
      document.querySelector(".todo-item-name").classList.add("hidden");
      document.querySelector(".edit-todo-button").classList.add("hidden");
      document.querySelector(".delete-todo-button").classList.add("hidden");
      document.querySelector(".edit-input").classList.remove("hidden");
      document.querySelector(".add-edited-task").classList.remove("hidden");
      console.log(tasks);
    } else if (e.target.dataset.name === "addEditedTask") {
      document.querySelector(".todo-item-name").classList.remove("hidden");
      document.querySelector(".edit-todo-button").classList.remove("hidden");
      document.querySelector(".delete-todo-button").classList.remove("hidden");
      document.querySelector(".edit-input").classList.add("hidden");
      document.querySelector(".add-edited-task").classList.add("hidden");
      const newValue = document.querySelector(".edit-input").value.trim();
      if (newValue) {
        const id = +e.target.dataset.id;
        console.log(tasks);
        tasks = tasks.map((t) => (t.id !== id ? t : { ...t, task: newValue }));
        console.log(tasks);
        rendertasks();
        saveToLocalStorage();
      }
    }
  });

  rendertasks();

  function saveToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  });

  document.querySelector('.todo-items').addEventListener('')
});


// Another Code 
document.addEventListener("DOMContentLoaded", () => {
//   const todoInput = document.getElementById("todo-input");
//   const addTaskBtn = document.getElementById("add-task-btn");
//   const todoList = document.getElementById("todo-list");

//   // localStorage.clear();
//   let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//   for (const task of tasks) {
//     renderTask(task);
//   }

//   addTaskBtn.addEventListener("click", () => {
//     const taskText = todoInput.value.trim();

//     if (taskText === "") return;

//     const newtask = {
//       id: Date.now(),
//       text: taskText,
//       completed: false,
//     };
//     tasks.push(newtask);
//     saveTasks();
//     renderTask(newtask);
//     todoInput.value = "";
//   });

//   function renderTask(task) {
//     const li = document.createElement("li");
//     li.classList.add("todo-item");
//     if (task.completed) li.classList.add("completed");
//     task.completed = !task.completed;
//     li.innerHTML = `
//       ${task.text}
//       <span class="todo-item-actions">
//         <button>Delete</button>
//       </span>
//     `;

//     li.addEventListener("dblclick", (e) => {
//       if (e.target.tagName !== "BUTTON") {
//         li.classList.toggle("completed");
//       }
//     });

//     li.querySelector("button").addEventListener("click", () => {
//       tasks = tasks.filter((t) => t.id !== task.id);
//       saveTasks();
//       li.remove();
//     });

//     todoList.appendChild(li);
//   }

//   function saveTasks() {
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//   }
// });
