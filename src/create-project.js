import { TodoItemManager } from "./todo-manager.js";

function createProject(title, description) {
    let allTodos = [];
    let todoList = [];
    let doingList = [];
    let doneList = [];
    
    function addTodoToList(todo) {
        todo.projectName = title;
        allTodos.push(todo);

        if (todo.getStatus() == TodoItemManager.STATUS[0]) {
            todoList.push(todo);
        }
        else if (todo.getStatus() == TodoItemManager.STATUS[1]) {
            doingList.push(todo);
        }
        else if (todo.getStatus() == TodoItemManager.STATUS[2]) {
            doneList.push(todo);
        }
    }

    function removeTodoFromList(todo) {
        allTodos.splice(allTodos.indexOf(todo), 1);

        if (todo.getStatus() == TodoItemManager.STATUS[0]) {
            todoList.splice(todoList.indexOf(todo), 1);
        }
        else if (todo.getStatus() == TodoItemManager.STATUS[1]) {
            doingList.splice(doingList.indexOf(todo), 1);
        }
        else if (todo.getStatus() == TodoItemManager.STATUS[2]) {
            doneList.splice(doneList.indexOf(todo), 1);
        }        
    }

    //for debugging
    function printAllTodos() {
        for (let i = 0; i < allTodos.length; i++) {
            console.log('Todo #' + (i + 1));
            allTodos[i].printTodo();
        }
    }

    return { title, description, addTodoToList, removeTodoFromList, printAllTodos }
}

export { createProject }
