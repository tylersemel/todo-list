import { createProject } from "./create-project.js";
import { ProjectUI } from "./project-UI.js";

const PageController = (function() {
    //in charge of sidebar projects
    let projects = [];
    // let defaultProject;
    //singleton
    // let ProjectUI = ProjectUI();
    const contentDiv = document.querySelector('.content');
    const generalBtn = document.querySelector('.general-proj-btn');
    generalBtn.addEventListener('click', handleGeneralBtnClick );

    // function setDefaultProject() {
    //     if (!defaultProject) {
    //         defaultProject = createProject('Default');
    //     }
    // }

    // const getDefaultProject = () => {
    //     return defaultProject;
    // }

    // function addProject(title) {
    //     let project = createProject(title);
    //     projects.push(project);
    // }

    function displayGeneralProjectPage() {
        ProjectUI.displayProject('Default');
    }

    function handleGeneralBtnClick() {
        clearContent();
        displayGeneralProjectPage();
    }

    function clearContent() {
        contentDiv.replaceChildren();
    }

    return { 
        projects,
        displayGeneralProjectPage 
    }

})();

export { PageController };