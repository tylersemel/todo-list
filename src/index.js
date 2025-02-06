import "./styles.css";
import { getDefaultProject, getProjects } from "./project-manager";
import { displayProject } from "./project-display";
import { DisplayDOM } from "./display-DOM";
import { getCurrentProject } from "./project-manager";


window.getProjects = getProjects();

DisplayDOM.render();


