const Utility = require("./utility.js");

class Note {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.id = Utility.generateId();
    }
}

module.exports = Note;