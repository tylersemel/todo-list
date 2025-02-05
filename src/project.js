import { Todo, STATUS } from "./todo.js";

class Project {
    constructor(title, todoList, doingList, doneList) {
        this.title = title;
        this.todoList = todoList || [];
        this.doingList = doingList || [];
        this.doneList = doneList || [];
        this.lists = [this.todoList, this.doingList, this.doneList];
    }

    checkWhichList(status) {
        if (status === STATUS[0]) {
            return this.todoList;
        }
        else if (status === STATUS[1]) {
            return this.doingList;
        }
        else if (status === STATUS[2]) {
            return this.doneList;
        }
    }

    createTodoItem(title, status, description, priority, dueDate, notes, checkList) {
        let todo = new Todo(title, status, description, priority, dueDate, notes, checkList);
        let list = this.checkWhichList(todo.status);
        this.addTodoToList(todo, list);
        return todo;
    }

    checkTodoInList(todo, list) {
        return list.indexOf(todo);
    }

    addTodoToList(todo, otherList) {
        this.removeTodo(todo);

        otherList.push(todo);
    }

    removeTodo(todo) {
        for (const list of this.lists) {
            let index = this.checkTodoInList(todo, list);
            if (index !== -1) {
                list.splice(index, 1);
                break;
            }
        }
    }

    getTodoFromList(whichList, idx) {
        const list = this.checkWhichList(whichList);
        return list[idx];
    }

    getAllTodos() {
        let allTodos = [];

        for (const list of this.lists) {
            for (const todo of list) {
                allTodos.push(todo);
            }
        }

        return allTodos;
    }

    //for debugging
    printAllTodos() {
        let todos = this.getAllTodos();

        for (const todo of todos) {
            todo.printTodo();
        }
    }
}

export { Project }
