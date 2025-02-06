import { Todo } from "./todo";
import { TodoView } from "./todo-display";

const todoModel = new Todo('title', 'todo');

const todos = [];
todos.push(todoModel);

const todoView = TodoView()