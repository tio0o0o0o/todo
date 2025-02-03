const Utility = require("./utility.js");

class ChecklistTask {
    constructor(title, items, dueDate, priority) {
        this.title = title;
        this.items = items;
        this.dueDate = dueDate;
        this.priority = priority;
        this.complete = false;
        this.id = Utility.generateId();
    }
}

class ChecklistItem {
    constructor(title) {
        this.title = title;
        this.complete = false;
    }
}

module.exports = { ChecklistTask, ChecklistItem };