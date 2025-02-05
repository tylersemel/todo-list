import "./styles.css";
import { DisplayManager } from "./display-manager";
import { Project } from "./project";
import { STATUS, Todo } from "./todo";
import { CreateProjectModal } from "./create-project-modal";
import { Storage } from "./storage";



DisplayManager.loadProjects();

// DisplayManager.displayProject(DisplayManager.getProjects()[0]);
// console.log(projects);

// const t = new Todo('testing');

// function useObject( { title } ) {
//     console.log(title);
// }

// useObject(  t );