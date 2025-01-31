import { DisplayManager, ProjectUI, CardUI } from "./display-manager";

const TodoUI = (() => {
    const contentDiv = document.querySelector('.content');
    const titleDiv = document.querySelector('dialog .todo-title');
    titleDiv.addEventListener('click', handleClickTodoTitle);
    const form = document.querySelector('dialog .title-form');
    form.addEventListener('submit', handleSubmitTodoTitle);
    const cancel = document.querySelector('dialog .cancel');
    cancel.addEventListener('click', closeModal);
    let _todo;
    const dialog = document.querySelector('dialog');
    dialog.className = 'todo-dialog';
    let cardDiv;

    //should have function called that adds all these listeners

    function handleClickTodo(event) {
        cardDiv = event.target.closest('.card');
        _todo = DisplayManager.getProjects()[0].getAllTodos()[0]; // thgis is wrong but just to test
        console.log(_todo);
        // createModalHTML(cardDiv);
        
        dialog.showModal();
        displayTodoTitle();
    }

    function displayTodoTitle() {
        const todoTitleDiv = document.querySelector('.todo-title');
        todoTitleDiv.textContent = _todo.title;

        const todoTitleInput = document.querySelector('#todo-title');
        todoTitleInput.value = _todo.title;
    }

    function handleClickTodoTitle() {
        const todoTitleContainers = document.querySelectorAll('.todo-title-container');
    

       toggleHidden(todoTitleContainers);
    //    displayTodoTitle();
        
    }

    function toggleHidden(elements) {
        for (const div of elements) {
            div.classList.toggle('hidden');
        }
    } 

    function handleSubmitTodoTitle(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        console.log(formData.get('todo-title'));
        _todo.title = formData.get('todo-title');

        CardUI.updateDivTitle(cardDiv, _todo.title);
        handleClickTodoTitle();
        displayTodoTitle();
    }

    function closeModal() {
        dialog.close();
        
    }

    return { handleClickTodo };

})();

export { TodoUI };