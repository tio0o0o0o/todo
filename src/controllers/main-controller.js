import NotesController from "./notes-controller.js";
import CategoriesController from "./categories-controller.js";

const notesController = new NotesController();
const categoriesController = new CategoriesController();

document.querySelector(".notesLink").addEventListener("click", () => {
    notesController.updateView();
});

document.querySelector(".categoriesLink").addEventListener("click", () => {
    categoriesController.updateView();
});