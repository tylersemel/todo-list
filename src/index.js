import { todoItemManager } from "./todo-item-manager.js";
import { createProject } from "./project-module.js";
import "./styles.css";

let projectsList = [];
const generalProject = createProject('General', 'Tasks with no project goes here!');
projectsList.push(generalProject);

let todo1 = todoItemManager.createTodoItem('Go to the store', 'Buy milk, eggs, beef', '01-21-2025', '', 'DOING');
let todo2 = todoItemManager.createTodoItem('Eat grocercies');
let todo3 = todoItemManager.createTodoItem('Have fun');


let myProject = createProject('tite');
let myProject2 = createProject('2');

myProject.addTodoToList(todo1);
myProject.addTodoToList(todo2);
myProject.addTodoToList(todo3);

myProject2.addTodoToList(todo2);

myProject.removeTodoFromList(todo2);

myProject.printAllTodos();