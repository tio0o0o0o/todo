const Task = require("./task.js")
const { ChecklistTask, ChecklistItem } = require("./checklistTask.js");

class Tasks {
    static taskList = [];

    static createTask(title, description, dueDate, priority) {
        const newTask = new Task(title, description, dueDate, priority);
        this.taskList.push(newTask);
        return newTask;
    }

    static updateTask(id, title, description, dueDate, priority) {
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

    static deleteTask(id) {
        for (let i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].id === id) {
                this.taskList.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    static toggleCompletion(id) {
        for (let i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].id === id) {
                this.taskList[i].complete = !this.taskList[i].complete;
                return true;
            }
        }
        return false;
    }
}

Tasks.createTask("Gym", "Go to QT Gym", "Today", "Low");
Tasks.createTask("Brush teeth", "", "Today", "Low");

module.exports = Tasks;