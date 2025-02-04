const Task = require("./task.js")

class Tasks {
    static taskList = [];

    static create(title, description, dueDate, priority, category) {
        const newTask = new Task(title, description, dueDate, priority, category);
        this.taskList.push(newTask);

        return newTask;
    }

    static update(id, title, description, dueDate, priority, category) {
        for (let i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].id === id) {
                this.taskList[i].title = title;
                this.taskList[i].description = description; 
                this.taskList[i].dueDate = dueDate; 
                this.taskList[i].priority = priority; 
                this.taskList[i].priority = category; 

                return true;
            }
        }
        return false;
    }

    static delete(id) {
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

Tasks.create("Gym", "Go to QT Gym", "Today", "Low", "Health");
Tasks.create("Brush teeth", "", "Today", "Low", "Basic stuff");

module.exports = Tasks;