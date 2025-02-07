import TasksModel from "../models/tasks.model.js";
import TasksView from "../views/tasks-view.js";
import Utility from "../utility/utility.js";
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
                throw new Error("categoryFilter is not a valid filter");
        }
        return filteredTasks;
    }

    updateView() {
        this.#tasksView.delete();
        this.#tasksView.create(this.filteredTasks);
        this.#assignDelete();
        this.#assignCreateModal();
        this.#assignUpdate();
        this.#assignToggleComplete();
    }

    initializeView() {
        this.#assignCancel();
        this.#assignCreate();
    }

    createPlaceholder(count = 1) {
        for (let i = 0; i < count; i++) {
            TasksModel.create({
                title: `Placeholder task ${i + 1}`,
                description: "Task description",
                dueDate: new Date(),
                priority: "mid",
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
                TasksModel.create({
                    title: titleInput.value,
                    description: descriptionInput.value,
                    dueDate: new Date(dateSelect.value),
                    priority: "mid"
                });
                titleInput.value = "";
                descriptionInput.value = "";
                dateSelect.value = format(new Date(), 'yyyy-MM-dd');
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
                modal.close();
            }
        });
    }

    #assignCreateModal() {
        Utility.assignFunction({
            elements: [document.querySelector(".createTaskButton")],
            functionToAssign: () => {
                const modal = document.querySelector(".createTaskModal");
                const dateSelect = modal.querySelector("#dateSelect");
                const today = format(new Date(), 'yyyy-MM-dd');
                dateSelect.defaultValue = today;
                const categorySelect = modal.querySelector("#categorySelect");
                const categoryList = ["gym", "study", "business"];
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
    
    #assignUpdate() {
        Utility.assignFunction({
            elements: document.querySelectorAll(".taskEditButton"),
            functionToAssign: (element) => {
                TasksModel.update(element.parentNode.parentNode.dataset.id, {
                    title: `Updated task name`,
                });
                this.updateView();
            }
        });
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
}



