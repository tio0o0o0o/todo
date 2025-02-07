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
        this.#assignShowModal();
        this.#assignToggleComplete();
        this.#assignOpenEditModal();
    }

    initializeView() {
        this.#assignCancel();
        this.#assignCreate();
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
                    category: categorySelect.value
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
                modal.showModal();
            }
        });
    }

    #assignInitializeModal() {
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
                const taskData = TasksModel.find(parentElementId);
                editTaskModal.querySelector("#editTitleInput").value = taskData.title;
                editTaskModal.querySelector("#editDescriptionInput").value = taskData.description;
                editTaskModal.querySelector("#editPrioritySelect").value = taskData.priority;
                const editCategorySelect = editTaskModal.querySelector("#editCategorySelect");
                const categoryList = ["gym", "study", "business"];
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
}



