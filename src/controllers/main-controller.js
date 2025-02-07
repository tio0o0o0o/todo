import NotesController from "./notes-controller.js";
import CategoriesController from "./categories-controller.js";
import TasksController from "./tasks-controller.js";
import Utility from "../utility/utility.js";

const notesController = new NotesController();
const categoriesController = new CategoriesController();
const tasksController = new TasksController();

notesController.createPlaceholder(3);
tasksController.createPlaceholder(3);

const notesLink = document.querySelector(".notesLink");
const categoriesLink = document.querySelector(".categoriesLink");
const allLink = document.querySelector(".allLink");
const todayLink = document.querySelector(".todayLink");
const weekLink = document.querySelector(".weekLink");
const links = [ notesLink, categoriesLink, allLink, todayLink, weekLink ];

notesLink.addEventListener("click", () => {
    notesController.updateView();
    assignSelected(notesLink);
});

categoriesLink.addEventListener("click", () => {
    categoriesController.updateView();
    assignSelected(categoriesLink);
});

allLink.addEventListener("click", () => {
    tasksController.dateFilter = "all";
    tasksController.categoryFilter = "all";
    tasksController.updateView(tasksController.allTasks);
    assignSelected(allLink);
});

todayLink.addEventListener("click", () => {
    tasksController.dateFilter = "today";
    tasksController.categoryFilter = "all";
    tasksController.updateView(tasksController.todaysTasks);
    assignSelected(todayLink);
});

weekLink.addEventListener("click", () => {
    tasksController.dateFilter = "week";
    tasksController.categoryFilter = "all";
    tasksController.updateView(tasksController.thisWeeksTasks);
    assignSelected(weekLink);
});

function assignSelected(linkToSelect) {
    links.forEach((link) => {
        link.dataset.selected = false;
    });
    linkToSelect.dataset.selected = true;
}

tasksController.initializeView();

tasksController.dateFilter = "all";
tasksController.updateView(tasksController.allTasks);
assignSelected(allLink);