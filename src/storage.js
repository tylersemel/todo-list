// import { DisplayManager } from "./display-manager";

// const Storage = (() => {
//     function storageAvailable(type) {
//         let storage;
//         try {
//           storage = window[type];
//           const x = "__storage_test__";
//           storage.setItem(x, x);
//           storage.removeItem(x);
//           return true;
//         } catch (e) {
//           return (
//             e instanceof DOMException &&
//             e.name === "QuotaExceededError" &&
//             // acknowledge QuotaExceededError only if there's something already stored
//             storage &&
//             storage.length !== 0
//           );
//         }
//       }

//       function saveProjectsToStorage(projects) {
//         if (storageAvailable("localStorage")) {
//             // Yippee! We can use localStorage awesomeness
//             localStorage.setItem('projects', JSON.stringify(projects));
//         } 
//         else {
//             // Too bad, no localStorage for us
//             console.log("space fail");
//         }
//       }

//       function getProjectsFromStorage() {
//         return JSON.parse(localStorage.getItem('projects'));
//       }

//       return { saveProjectsToStorage, getProjectsFromStorage };
// })();

// export { Storage };