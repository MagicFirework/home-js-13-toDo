"use strict";

const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");

const toDoData = JSON.parse(localStorage.getItem("note")) || [];

const render = () => {
  todoList.innerHTML = "";
  todoCompleted.innerHTML = "";
  toDoData.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerHTML =
      '<span class="text-todo">' +
      item.text +
      "</span>" +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      "</div>";

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    li.querySelector(".todo-complete").addEventListener("click", () => {
      item.completed = !item.completed;
      localStorage.setItem("note", JSON.stringify(toDoData));
      render();
    });

    li.querySelector(".todo-remove").addEventListener("click", (e) => {
      const searchName =
        e.target.parentNode.parentNode.querySelector("span").textContent;
      const index = toDoData.findIndex((elem) => elem.text === searchName);

      toDoData.splice(index, 1);
      localStorage.setItem("note", JSON.stringify(toDoData));
      render();
    });
  });
};

todoControl.addEventListener("submit", (e) => {
  e.preventDefault();

  if (headerInput.value.trim() !== "") {
    const item = {
      text: headerInput.value,
      completed: false,
    };
    toDoData.push(item);
    localStorage.setItem("note", JSON.stringify(toDoData));

    headerInput.value = "";
    render();
  }
});
render();
