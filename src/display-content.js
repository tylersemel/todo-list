import { getDefaultProject, getProjects } from "./project-manager";
import { displayProject } from "./project-display";

//main display functionality
export const contentDiv = document.querySelector('.content');

//only singleton in project
export const DisplayDOM = (() => {
    function clearContent(element) {
        element.replaceChildren();
    }

    function render() {
        const defaultProject = getDefaultProject();

        displayProject(defaultProject);
        
    }

    return { clearContent, render }
})();
