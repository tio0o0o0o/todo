const Note = require("./note.js");

class Notes {
    static noteList = [];

    static createNote(title, description) {
        const newNote = new Note(title, description);
        this.noteList.push(newNote);
        return newNote;
    }

    static updateNote(id, title, description) {
        for (let i = 0; i < this.noteList.length; i++) {
            if (this.noteList[i].id === id) {
                this.noteList[i].title = title;
                this.noteList[i].description = description; 
                return true;
            }
        }
        return false;
    }

    static deleteNote(id) {
        for (let i = 0; i < this.noteList.length; i++) {
            if (this.noteList[i].id === id) {
                this.noteList.splice(i, 1);
                return true;
            }
        }
        return false;
    }
}

Notes.createNote("Random thoughts", "I should buy some condoms...");
Notes.createNote("Business ideas", "Only Fans");

module.exports = Notes;