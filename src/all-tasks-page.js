import { DisplayManager } from "./display-manager";

const AllTasksPageUI = (() => {
    const contentDiv = document.querySelector('.content');
    
    function handleClickAllTasksBtn(event) {
        createPageHTML();
    }

    function createPageHTML() {
        contentDiv.innerHTML = 
        ``;
    }


})();

export { AllTasksPageUI };