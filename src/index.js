import "./styles.css";
import { DisplayManager } from "./display-manager";
import { Project } from "./project";
import { STATUS } from "./todo";

const defaultProject = new Project('Default');
const generalBtn = document.querySelector('.general-proj-btn');
generalBtn.addEventListener('click', () => {
    DisplayManager.displayProject(defaultProject);
});

const testProj = new Project('Test');
const testProjBtn = document.querySelector('.test-proj');

testProj.createTodoItem('Testing task');
testProj.createTodoItem('Testing task 2', STATUS[1]);

testProjBtn.addEventListener('click', () => {
    //prob should have a function that adds the project first then displays it
    DisplayManager.displayProject(testProj);
});