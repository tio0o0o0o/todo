import Utility from "../utility/utility.js";
const deleteImg = require("../assets/images/delete.svg");
const edit = require("../assets/images/edit.svg");
const plus = require("../assets/images/add.svg");
import "../assets/styles/tasks.css";
const { format } = require("date-fns");

export default class TasksView {
    constructor(parent = document.querySelector("main")) {
        this.parent = parent;
    }

    create(tasks) {
        const flexContainer = Utility.createElement({
            tag: "div",
            attributes: ["class", "flexContainer"],
            parent: this.parent
        });

        tasks.forEach((task) => {
            this.#createTask(task, flexContainer);
        });

        const createTaskButton = Utility.createElement({
            tag: "input",
            attributes: ["class", "createTaskButton", "type", "image", "src", plus],
            parent: this.parent
        });
    }

    #createTask(task, taskParent) {
        const newTask = Utility.createElement({
            tag: "div",
            attributes: ["class", "newTask", "data-id", task.id],
            parent: taskParent
        });

        const left = Utility.createElement({
            tag: "div",
            attributes: ["class", "newTaskLeft"],
            parent: newTask
        });

        const right = Utility.createElement({
            tag: "div",
            attributes: ["class", "newTaskRight"],
            parent: newTask
        });

        const isComplete = Utility.createElement({
            tag: "input",
            attributes: ["type", "checkbox", "class", "isComplete"],
            parent: left
        });
        isComplete.checked = task.complete;

        const title = Utility.createElement({
            tag: "p",
            attributes: ["class", "taskTitle"],
            textContent: task.title,
            parent: left
        });

        const dueDate = Utility.createElement({
            tag: "p",
            attributes: ["class", "taskDueDate"],
            textContent: format(task.dueDate, "MMM do"),
            parent: right
        });

        const editButton = Utility.createElement({
            tag: "input",
            attributes: ["class", "taskEditButton", "type", "image", "src", edit],
            parent: right
        });

        const deleteButton = Utility.createElement({
            tag: "input",
            attributes: ["class", "taskDeleteButton", "type", "image", "src", deleteImg],
            parent: right
        });
    }

    delete() {
        while (this.parent.hasChildNodes()) {
            this.parent.removeChild(this.parent.lastChild);
        }
    }
}
