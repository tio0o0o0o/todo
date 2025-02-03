const Utility = require("./utility.js");

class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.complete = false;
        this.id = Utility.generateId();
    }
}

exports.Task = Task;