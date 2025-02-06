import TasksModel from "../models/tasks.model.js";
import TasksView from "../views/tasks-view.js";
import Utility from "../utility/utility.js";

export default class TasksController {
    #tasksView = new TasksView();

    updateView() {
        this.#tasksView.delete();
        this.#tasksView.create(TasksModel.read());
        this.#assignDelete();
        this.#assignCreate();
    }

    createPlaceholder(count = 1) {
        for (let i = 0; i < count; i++) {
            TasksModel.create({
                title: `Placeholder task ${i + 1}`,
                description: "Task description",
                dueDate: "Today",
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
        Utility.assignFunction({
            elements: [document.querySelector(".createTaskButton")],
            functionToAssign: () => {
                TasksModel.create({
                    title: `New task`,
                    description: "Task description",
                    dueDate: "Today",
                    priority: "mid",
                });
                this.updateView();
            }
        });
    }   
}


