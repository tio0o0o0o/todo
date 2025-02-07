import TasksModel from "../models/tasks.model.js";
import TasksView from "../views/tasks-view.js";
import Utility from "../utility/utility.js";
const { isThisWeek, isToday } = require("date-fns");

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
        this.#assignCreate();
        this.#assignUpdate();
        this.#assignToggleComplete();
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
        Utility.assignFunction({
            elements: [document.querySelector(".createTaskButton")],
            functionToAssign: () => {
                const date = prompt("Input date: (yyyy-mm-dd)");
                TasksModel.create({
                    title: `New task`,
                    description: "Task description",
                    dueDate: new Date(date),
                    priority: "mid"
                });
                this.updateView();
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



