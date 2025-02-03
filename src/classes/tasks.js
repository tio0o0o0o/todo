import Task from "./task.js";
import { ChecklistTask, ChecklistItem } from "./checklistTask.js";

export default class Tasks {
    taskList = [];

    createTask(title, description, dueDate, priority) {
        const newTask = new Task(title, description, dueDate, priority)
        this.taskList.push(newTask);
        return newTask;
    }

    updateTask(id, title, description, dueDate, priority) {
        for (let i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].id === id) {
                this.taskList[i].title = title;
                this.taskList[i].description = description; 
                this.taskList[i].dueDate = dueDate; 
                this.taskList[i].priority = priority; 
                return true;
            }
        }
        return false;
    }

    deleteTask(id) {
        for (let i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].id === id) {
                this.taskList.splice(i);
                return true;
            }
        }
        return false;
    }
}