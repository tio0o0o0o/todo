import Task from "./task.js";

export default class TasksModel {
    static tasks = this.initializeProxy();
    static hasInitialized = false;

    static create({ title = "", description = "", dueDate = new Date(), priority = "mid", category = "" } = {}) {
        if (title === "") title = "New task";

        const newTask = new Task(title, description, dueDate, priority, category);
        this.tasks.push(newTask);

        // Save data
        this.saveDataProxy();

        return newTask;
    }

    static read() {
        return this.tasks;
    }

    static find(id) {
        return this.tasks.find((task) => {
            return task.id === id;
        });
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

        // Save data
        this.saveDataProxy();
    }

    static delete(id) {
        this.tasks = this.tasks.filter((task) => {
            return task.id !== id;
        });

        // Save data
        this.saveDataProxy();
    }

    static initializeProxy() {
        if (!this.hasInitialized) {
            this.hasInitialized = true;
            const tasksParsed = JSON.parse(localStorage.getItem("tasks"));
            if (tasksParsed) {
                return tasksParsed;
            }
            else {
                return this.createDefault();
            }
        }
    }

    static createDefault() {
        return [
            new Task(
                "Rizz up a gyatt",
                "Rizz Livvy Dunne's gyatt",
                new Date(),
                "high",
                "default"
            )
        ];
    }

    static saveDataProxy() {
        const tasksString = JSON.stringify(this.tasks);
        localStorage.setItem("tasks", tasksString);
    }
}


