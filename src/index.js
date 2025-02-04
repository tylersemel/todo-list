import "./styles.css";
import { DisplayManager } from "./display-manager";
import { Project } from "./project";
import { STATUS } from "./todo";
import { CreateProjectModal } from "./create-project-modal";
import { Storage } from "./storage";



const projects = Storage.getProjectsFromStorage();

console.log(projects);