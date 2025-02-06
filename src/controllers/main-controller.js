import NotesController from "./notes-controller.js";
import CategoriesController from "./categories-controller.js";
import TasksController from "./tasks-controller.js";

const notesController = new NotesController();
const categoriesController = new CategoriesController();
const tasksController = new TasksController();

notesController.createPlaceholder(3);
tasksController.createPlaceholder(3);

document.querySelector(".notesLink").addEventListener("click", () => {
    notesController.updateView();
});

document.querySelector(".categoriesLink").addEventListener("click", () => {
    categoriesController.updateView();
});

document.querySelector(".allLink").addEventListener("click", () => {
    tasksController.dateFilter = "all";
    tasksController.updateView(tasksController.allTasks);
});

document.querySelector(".todayLink").addEventListener("click", () => {
    tasksController.dateFilter = "today";
    tasksController.updateView(tasksController.todaysTasks);
});

document.querySelector(".weekLink").addEventListener("click", () => {
    tasksController.dateFilter = "week";
    tasksController.updateView(tasksController.thisWeeksTasks);
});