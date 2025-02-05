import "./styles.css";
import { getDefaultProject, getProjects } from "./project-manager";
import { displayProject } from "./project-display";
import { DisplayDOM } from "./display-content";

window.getProjects = getProjects();

DisplayDOM.render();

// document.addEventListener('savePendingCard', (e) => {
//     console.log(e.detail);
// });

// function wow(e) {
//     console.log("in index js" + e.name2);
// }
