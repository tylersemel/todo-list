import { TodoItem, STATUS, PRIORITY } from "./todo-item.js";

function createProject(title) {
    let todoList = [];
    let doingList = [];
    let doneList = [];
    let lists = [todoList, doingList, doneList];

    function checkWhichList(status) {
        if (status === STATUS[0]) {
            return todoList;
        }
        else if (status === STATUS[1]) {
            return doingList;
        }
        else if (status === STATUS[2]) {
            return doneList;
        }
    }

    function createTodoItem(title, status) {
        let todo = new TodoItem(title, status);
        let list = checkWhichList(todo.status);
        addTodoToList(todo, list);
        return todo;
    }

    function checkTodoInList(todo, list) {
        return list.indexOf(todo);
    }

    function addTodoToList(todo, otherList) {
        for (const list of lists) {
            let index = checkTodoInList(todo, list);
            if (index !== -1) {
                list.splice(index, 1);
                break;
            }
        }

        otherList.push(todo);
    }

    function getAllTodos() {
        let allTodos = [];

        for (const list of lists) {
            for (const todo of list) {
                allTodos.push(todo);
            }
        }

        return allTodos;
    }

    //for debugging
    function printAllTodos() {
        let todos = getAllTodos();

        for (const todo of todos) {
            todo.printTodo();
        }
    }

    return { 
        title, 
        addTodoToList, 
        printAllTodos, 
        createTodoItem, 
        checkWhichList,
        todoList, 
        doingList, 
        doneList 
    }
}

export { createProject }
