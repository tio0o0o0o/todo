const Utility = require("./utility.js");

class Task {
    constructor(title, description, dueDate, priority, category) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.category = category;
        this.complete = false;
        this.id = Utility.generateId();
    }
}

module.exports = Task;