import Utility from "../utility/utility.js";

export default class Task {
    constructor(title, description, dueDate, priority, category) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.category = category;
        this.complete = false;
        this.id = Utility.randomString(20);
    }
}