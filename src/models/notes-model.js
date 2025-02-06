import Note from "./note.js";

export default class NotesModel {
    static notes = [];

    static create({ title = "New note", description = "" } = {}) {
        const newNote = new Note(title, description);
        this.notes.push(newNote);
        return newNote;
    }

    static read() {
        return this.notes;
    }

    static update(id, { title = "", description } = {}) {
        const note = notes.find((note) => note.id === id);

        if (!note) throw new Error(`ID of ${id} was not found`);

        if (title !== "") note.title = title;
        if (description !== undefined) note.description = description;
    }

    static delete(id) {
        this.notes = this.notes.filter((note) => {
            return note.id !== id;
        });
    }
}


