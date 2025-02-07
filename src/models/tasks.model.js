import Task from "./task.js";

export default class TasksModel {
    static tasks = [];

    static create({ title = "", description = "", dueDate = new Date(), priority = "mid", category = "" } = {}) {
        if (!title && !description && !dueDate && !priority) throw new Error("Title, description, and dueDate are required");

        const newTask = new Task(title, description, dueDate, priority, category);
        this.tasks.push(newTask);
        return newTask;
    }

    static read() {
        return this.tasks;
    }

    static update(id, { title = "", description, dueDate = "", priority = "", category, complete = "" } = {}) {
        const task = this.tasks.find((task) => task.id === id);
        if (!task) throw new Error(`ID of ${id} was not found`);
        if (title !== "") task.title = title;
        if (description !== undefined) task.description = description;
        if (dueDate !== "") task.dueDate = dueDate;
        if (priority !== "") task.priority = priority;
        if (category !== undefined) task.category = category;
        if (complete !== "") task.complete = complete; 
    }

    static delete(id) {
        this.tasks = this.tasks.filter((task) => {
            return task.id !== id;
        });
    }
}


