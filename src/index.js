import "./styles.css";
import { DisplayManager } from "./display-manager";
import { Project } from "./project";
import { STATUS } from "./todo";
import { CreateProjectModal } from "./create-project-modal";
const createProjectBtn = document.querySelector('.create-project-btn');
createProjectBtn.addEventListener('click', CreateProjectModal.displayModal);



const defaultProject = new Project('Default');
const generalBtn = document.querySelector('.general-proj-btn');
generalBtn.addEventListener('click', () => {
    DisplayManager.displayProject(defaultProject);
});



const testProj = DisplayManager.addProject('test project');
testProj.createTodoItem('Testing task');
testProj.createTodoItem('Testing task todo 2', STATUS[0]);
testProj.createTodoItem('Testing doing', STATUS[1]);

DisplayManager.displayProject(defaultProject);


// const dialog = document.querySelector('dialog');
// dialog.showModal();