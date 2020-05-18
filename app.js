//define ui var
const input = document.querySelector("#task");
const form = document.querySelector("#task-form");
const tasklist = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");

//load all eventlistners
loadEventListners();

//define all event listners
function loadEventListners() {
  // load the content just after dom loads
  document.addEventListener("DOMContentLoaded", getTasks);

  form.addEventListener("submit", addTask);
  document.body.addEventListener("click", deleteTask);
  clearBtn.addEventListener("click", clrAll);
  filter.addEventListener("keyup", filtertask);
}

//getTasks
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task) {
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(`${task}`));
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    tasklist.appendChild(li);
  });
}
//add task
function addTask(e) {
  if (input.value === "") {
    alert("please enter a task");
  } else {
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(`${input.value}`));
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    tasklist.appendChild(li);

    //add to local storage
    addTaskTOLocalStorage(input.value);
  }
  input.value = "";
  e.preventDefault();
}

//persist to local storage;
function addTaskTOLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
//delete task
function deleteTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("are u sure")) {
      e.target.parentElement.parentElement.remove();
      deleteTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//delete from localStorage
function deleteTaskFromLocalStorage(deleteItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task, index) {
    if (deleteItem.textContent === task) {
      tasks.splice(index);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
}
//clear all
function clrAll(e) {
  // tasklist.innerHTML="";
  while (tasklist.firstChild) {
    tasklist.removeChild(tasklist.firstChild);
  }
  clearAllFromLocalStorage();
  e.preventDefault();
}
//clear all frorm local storage
function clearAllFromLocalStorage() {
  localStorage.clear();
}

//filter

function filtertask(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
