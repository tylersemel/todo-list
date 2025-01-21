function createProject(title, description, todos) {
    let toDoList = [];
    let doingList = [];
    let doneList = [];
    
    function addTodoToList(todo, list) {
        todo.projectName = title;
        list.push(todo);
    }

    return { title, description, todos, addTodoToList }
}