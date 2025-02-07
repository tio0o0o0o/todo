import CategoriesView from "../views/categories-view";
import CategoriesModel from "../models/categories-model";
import Utility from "../utility/utility";
import TasksModel from "../models/tasks.model";

export default class CategoriesController {
    #categoriesView = new CategoriesView();

    updateView() {
        this.#categoriesView.delete();
        this.#categoriesView.create(CategoriesModel.categories);
        this.#assignCreate();
        this.#assignUpdate();
        this.#assignDelete();
    }

    #assignCreate() {
        Utility.assignFunction({
            elements: [document.querySelector(".createCategoryButton")],
            functionToAssign: () => {
                CategoriesModel.create("New category");
                this.updateView();
            }
        });
    }

    #assignUpdate() {
        Utility.assignFunction({
            event: "focusout",
            elements: document.querySelectorAll(".categoryName"),
            functionToAssign: (element) => {
                const tasksWithCategory = TasksModel.read().filter((task) => task.category === element.parentNode.dataset.name);
                tasksWithCategory.forEach((task) => {
                    task.category = element.value;
                });
                CategoriesModel.update(element.parentNode.dataset.name, element.value);
                this.updateView();
            }
        });
    }

    #assignDelete() {
        Utility.assignFunction({
            event: "click",
            elements: document.querySelectorAll(".deleteCategoryButton"),
            functionToAssign: (element) => {
                const tasksWithCategory = TasksModel.read().filter((task) => task.category === element.parentNode.dataset.name);
                tasksWithCategory.forEach((task) => {
                    task.category = "default";
                });
                CategoriesModel.delete(element.parentNode.dataset.name);
                this.updateView();
            }
        });
    }
}