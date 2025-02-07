import TasksModel from "../models/tasks.model.js";
import TasksView from "../views/tasks-view.js";
import Utility from "../utility/utility.js";
import { el } from "date-fns/locale";
import CategoriesModel from "../models/categories-model.js";
const { isThisWeek, isToday, format } = require("date-fns");

export default class TasksController {
    #tasksView = new TasksView();
    dateFilter = "all";
    categoryFilter = "all";

    get filteredTasks() {
        let filteredTasks = TasksModel.read();
        switch(this.dateFilter) {
            case "all":
                break;
            case "today":
                filteredTasks = filteredTasks.filter((task) => isToday(task.dueDate));
                break;
            case "week":
                filteredTasks = filteredTasks.filter((task) => isThisWeek(task.dueDate));
                break;
            default:
                throw new Error("dateFilter is not a valid filter");
        }    
        switch(this.categoryFilter) {
            case "all":
                break;
            default:
                filteredTasks = filteredTasks.filter((task) => {
                    return task.category === this.categoryFilter;
                });
        }
        return filteredTasks;
    }

    updateView() {
        this.#tasksView.delete();
        this.#tasksView.create(this.filteredTasks);
        this.#initializeFilters();
        this.#assignDelete();
        this.#assignShowModal();
        this.#assignToggleComplete();
        this.#assignOpenEditModal();
    }

    initializeView() {
        this.#assignCancel();
        this.#assignCreate();
        this.#assignCancelEdit();
        this.#assignEdit();
        this.#assignInitializeModal();
    }

    createPlaceholder(count = 1) {
        for (let i = 0; i < count; i++) {
            TasksModel.create({
                title: `Placeholder task ${i + 1}`,
                description: "Task description",
                dueDate: new Date(),
                priority: "medium"
            });
        }
    }

    #assignDelete() {
        Utility.assignFunction({
            elements: document.querySelectorAll(".taskDeleteButton"),
            functionToAssign: (element) => {
                TasksModel.delete(element.parentNode.parentNode.dataset.id);
                this.updateView();
            }
        });
    }

    #assignCreate() {
        console.log("Assign create");
        Utility.assignFunction({
            elements: [document.querySelector("#addNewTaskButton")],
            functionToAssign: () => {
                const modal = document.querySelector(".createTaskModal");
                const titleInput = modal.querySelector("#createTitleInput");
                const descriptionInput = modal.querySelector("#createDescriptionInput");
                const dateSelect = modal.querySelector("#dateSelect");
                const categorySelect = modal.querySelector("#categorySelect");
                const prioritySelect = modal.querySelector("#prioritySelect");

                TasksModel.create({
                    title: titleInput.value,
                    description: descriptionInput.value,
                    dueDate: new Date(dateSelect.value),
                    priority: prioritySelect.value,
                    category: categorySelect.value.toLowerCase()
                });
                titleInput.value = "";
                descriptionInput.value = "";
                dateSelect.value = format(new Date(), 'yyyy-MM-dd');
                categorySelect.value = "default";
                prioritySelect.value = "medium";
                modal.close();
                this.updateView();
            }
        });
    }  

    #assignCancel() {
        Utility.assignFunction({
            elements: [document.querySelector("#cancelNewTaskButton")],
            functionToAssign: () => {
                const modal = document.querySelector(".createTaskModal");
                const titleInput = modal.querySelector("#createTitleInput");
                const descriptionInput = modal.querySelector("#createDescriptionInput");
                const dateSelect = modal.querySelector("#dateSelect");
                const categorySelect = modal.querySelector("#categorySelect");
                const prioritySelect = modal.querySelector("#prioritySelect");
                titleInput.value = "";
                descriptionInput.value = "";
                dateSelect.value = format(new Date(), 'yyyy-MM-dd');
                categorySelect.value = "default";
                prioritySelect.value = "medium";
                modal.close();
            }
        });
    }

    #assignShowModal() {
        Utility.assignFunction({
            elements: [document.querySelector(".createTaskButton")],
            functionToAssign: () => {
                const modal = document.querySelector(".createTaskModal");
                const categorySelect = modal.querySelector("#categorySelect");
                Utility.removeChildElements(categorySelect);
                const categoryList = CategoriesModel.categories;
                Utility.createElement({
                    tag: "option",
                    attributes: ["value", "default"],
                    textContent: "Default",
                    parent: categorySelect
                });
                categoryList.forEach((category) => {
                    Utility.createElement({
                        tag: "option",
                        attributes: ["value", category],
                        textContent: Utility.capitalize(category),
                        parent: categorySelect
                    });
                });
                modal.showModal();
            }
        });
    }

    #assignInitializeModal() {
        const modal = document.querySelector(".createTaskModal");
        const dateSelect = modal.querySelector("#dateSelect");
        const today = format(new Date(), 'yyyy-MM-dd');
        dateSelect.defaultValue = today;
    }

    #assignToggleComplete() {
        Utility.assignFunction({
            event: "input",
            elements: document.querySelectorAll(".isComplete"),
            functionToAssign: (element) => {
                TasksModel.update(element.parentNode.parentNode.dataset.id, {
                    complete: element.checked
                });
                this.updateView();
            }
        });
    }

    #assignOpenEditModal() {
        Utility.assignFunction({
            elements: document.querySelectorAll(".taskEditButton"),
            functionToAssign: (element) => {
                const editTaskModal = document.querySelector(".editTaskModal");
                const parentElementId = element.parentNode.parentNode.dataset.id;
                editTaskModal.dataset.id = parentElementId;
                const taskData = TasksModel.find(parentElementId);
                editTaskModal.querySelector("#editTitleInput").value = taskData.title;
                editTaskModal.querySelector("#editDescriptionInput").value = taskData.description;
                editTaskModal.querySelector("#editPrioritySelect").value = taskData.priority;
                const editCategorySelect = editTaskModal.querySelector("#editCategorySelect");
                Utility.removeChildElements(editCategorySelect);
                Utility.createElement({
                    tag: "option",
                    attributes: ["value", "default"],
                    textContent: "Default",
                    parent: editCategorySelect
                });
                const categoryList = CategoriesModel.categories;
                categoryList.forEach((category) => {
                    Utility.createElement({
                        tag: "option",
                        attributes: ["value", category],
                        textContent: Utility.capitalize(category),
                        parent: editCategorySelect
                    });
                });
                if (taskData.category !== "") editCategorySelect.value = taskData.category;
                editTaskModal.querySelector("#editDateSelect").value = format(taskData.dueDate, 'yyyy-MM-dd')
                editTaskModal.showModal();
            }
        });
    }

    #assignCancelEdit() {
        Utility.assignFunction({
            elements: [document.querySelector("#cancelEditButton")],
            functionToAssign: () => {
                const modal = document.querySelector(".editTaskModal");
                const titleInput = modal.querySelector("#editTitleInput");
                const descriptionInput = modal.querySelector("#editDescriptionInput");
                const dateSelect = modal.querySelector("#editDateSelect");
                const categorySelect = modal.querySelector("#editCategorySelect");
                const prioritySelect = modal.querySelector("#editPrioritySelect");
                titleInput.value = "";
                descriptionInput.value = "";
                dateSelect.value = format(new Date(), 'yyyy-MM-dd');
                categorySelect.value = "default";
                prioritySelect.value = "medium";
                modal.close();
            }
        });
    }

    #assignEdit() {
        console.log("Assign edit");
        Utility.assignFunction({
            elements: [document.querySelector("#confirmEditButton")],
            functionToAssign: (element) => {
                const modal = document.querySelector(".editTaskModal");
                const titleInput = modal.querySelector("#editTitleInput");
                const descriptionInput = modal.querySelector("#editDescriptionInput");
                const dateSelect = modal.querySelector("#editDateSelect");
                const categorySelect = modal.querySelector("#editCategorySelect");
                const prioritySelect = modal.querySelector("#editPrioritySelect");

                TasksModel.update(element.parentNode.parentNode.dataset.id, {
                    title: titleInput.value,
                    description: descriptionInput.value,
                    dueDate: new Date(dateSelect.value),
                    priority: prioritySelect.value,
                    category: categorySelect.value.toLowerCase()
                });
                titleInput.value = "";
                descriptionInput.value = "";
                dateSelect.value = format(new Date(), 'yyyy-MM-dd');
                categorySelect.value = "default";
                prioritySelect.value = "medium";
                modal.close();
                this.updateView();
            }
        });
    }

    #initializeFilters() {
        Utility.assignFunction({
            elements: document.querySelectorAll(".filter"),
            functionToAssign: (element) => {
                this.categoryFilter = element.dataset.filter;
                this.updateView();
            }
        });
    }
}



