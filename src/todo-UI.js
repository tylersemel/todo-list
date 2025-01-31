import { DisplayManager } from "./display-manager";

const TodoUI = (() => {
    const contentDiv = document.querySelector('.content');
    
    function handleClickTodo(event) {
        let cardDiv = event.target.closest('.card');
        console.log(cardDiv);
        // createModalHTML(cardDiv);
    }


    return { handleClickTodo };

})();

export { TodoUI };